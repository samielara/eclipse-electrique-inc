"use client";

import {
  AlertTriangle,
  ArrowRight,
  Bot,
  MessageSquare,
  PhoneCall,
  Send,
  X,
} from "lucide-react";
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getAssistantGreeting,
  getAssistantQuickReplies,
  getAssistantReply,
  type AssistantAction,
  type AssistantReply,
} from "@/lib/knowledge-base";
import type { Locale } from "@/lib/routes";

type AssistantVisibilityAction =
  | { type: "open" }
  | { type: "close" };

interface ConversationMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  reply?: AssistantReply;
}

interface AssistantReplyCardProps {
  reply: AssistantReply;
  onAction?: (
    event: MouseEvent<HTMLAnchorElement>,
    action: AssistantAction,
  ) => void;
}

const assistantCopy = {
  fr: {
    launcher: "Assistant 24/7",
    openLabel: "Ouvrir le Chatbot IA Éclipse",
    title: "Éclipse AI Chatbot",
    description: "Orientation et assistance en direct 24/7 pour vos besoins électriques",
    status: "En ligne · Réponse immédiate",
    close: "Fermer le chatbot",
    conversation: "Conversation avec le Chatbot IA Éclipse",
    quickReplies: "Choisissez un sujet",
    inputLabel: "Votre message",
    placeholder: "Décrivez votre besoin électrique…",
    send: "Envoyer",
    thinking: "Éclipse AI Chatbot prépare une réponse…",
    disclaimer: "Assistant automatique · Conseils d'orientation, sans diagnostic à distance.",
  },
  en: {
    launcher: "24/7 assistant",
    openLabel: "Open the Éclipse AI chatbot",
    title: "Éclipse AI Chatbot",
    description: "24/7 interactive guidance for your electrical projects and emergencies",
    status: "Online · Instant response",
    close: "Close the chatbot",
    conversation: "Conversation with the Éclipse AI chatbot",
    quickReplies: "Choose a topic",
    inputLabel: "Your message",
    placeholder: "Describe your electrical need…",
    send: "Send",
    thinking: "Éclipse AI Chatbot is preparing a reply…",
    disclaimer: "Automated assistant · General guidance, not a remote diagnosis.",
  },
} as const;

export function assistantVisibilityReducer(
  state: boolean,
  action: AssistantVisibilityAction,
): boolean {
  if (action.type === "open") return true;
  if (action.type === "close") return false;
  return state;
}

export function FormattedMessageText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="assistant-message-content">
      {paragraphs.map((para, i) => {
        const lines = para.split(/\n/);
        return (
          <p key={i}>
            {lines.map((line, lineIdx) => {
              const parts = line.split(/(\*\*[^*]+\*\*)/g);
              const isBullet = line.trimStart().startsWith("•") || /^\d+\./.test(line.trimStart());
              return (
                <span
                  className={isBullet ? "assistant-bullet-line" : undefined}
                  key={lineIdx}
                  style={isBullet ? { display: "block", marginTop: lineIdx > 0 ? "0.28rem" : undefined } : undefined}
                >
                  {parts.map((part, j) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={j}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export function AssistantReplyCard({
  reply,
  onAction,
}: AssistantReplyCardProps) {
  const isFrench = reply.locale === "fr";
  const action = reply.action;

  if (reply.emergency) {
    return (
      <article className="assistant-emergency-card" role="alert">
        <div className="assistant-emergency-heading">
          <AlertTriangle aria-hidden="true" />
          <strong>{isFrench ? "Urgence électrique" : "Electrical emergency"}</strong>
        </div>
        <FormattedMessageText text={reply.message} />
        {action && (
          <a
            className="assistant-emergency-action"
            href={action.href}
            onClick={(event) => onAction?.(event, action)}
          >
            <PhoneCall aria-hidden="true" />
            <span>{action.label}</span>
          </a>
        )}
      </article>
    );
  }

  return (
    <div className="assistant-reply-card">
      <FormattedMessageText text={reply.message} />
      {action && (
        <a
          className="assistant-reply-action"
          href={action.href}
          onClick={(event) => onAction?.(event, action)}
          rel={action.href.startsWith("http") ? "noreferrer" : undefined}
          target={action.href.startsWith("http") ? "_blank" : undefined}
        >
          <span>{action.label}</span>
          <ArrowRight aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function AiAssistant({ locale }: { locale: Locale }) {
  const copy = assistantCopy[locale];
  const [open, dispatch] = useReducer(assistantVisibilityReducer, false);
  const [unread, setUnread] = useState(true);
  const [input, setInput] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>(() => [
    {
      id: 0,
      role: "assistant",
      text: getAssistantGreeting(locale),
    },
  ]);
  const requestRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const openRef = useRef(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const messageIdRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const quickReplies = getAssistantQuickReplies(locale);

  useEffect(() => {
    // Capture the stable generation ref, not its value: cleanup invalidates the latest request.
    const requestGeneration = requestIdRef;
    return () => {
      requestGeneration.current++;
      openRef.current = false;
      requestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    void fetch("/api/assistant", { signal: controller.signal })
      .then(response => response.ok ? response.json() : { enabled: false })
      .then(value => setAiEnabled(value.enabled === true))
      .catch(() => {});
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (open) messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [isResponding, messages, open]);

  function handleOpenChange(nextOpen: boolean) {
    openRef.current = nextOpen;
    dispatch({ type: nextOpen ? "open" : "close" });
    if (nextOpen) setUnread(false);
  }

  async function submitMessage(rawMessage: string) {
    const text = rawMessage.trim().slice(0, 600);
    if (!text) return;
    // A new hazard must interrupt even a stalled ordinary AI request.
    let reply = getAssistantReply(text, locale);
    if (requestRef.current && !reply.emergency) return;
    const requestId = ++requestIdRef.current;
    requestRef.current?.abort();
    requestRef.current = null;

    const userMessage: ConversationMessage = {
      id: messageIdRef.current++,
      role: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsResponding(true);

    // Safety is local and immediate, and is checked again by the server.
    if (aiEnabled && !reply.emergency) {
      const controller = new AbortController();
      requestRef.current = controller;
      const timer = setTimeout(() => controller.abort(), 7000);
      try {
        const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, locale }), signal: controller.signal });
        if (response.ok) {
          const value = await response.json();
          if (typeof value.reply?.message === "string" && typeof value.reply?.emergency === "boolean") reply = value.reply;
        }
      } catch { /* Keep the full deterministic reply on network/provider failure. */ }
      finally {
        clearTimeout(timer);
        if (requestId === requestIdRef.current) requestRef.current = null;
      }
    } else if (!reply.emergency) {
      await new Promise((resolve) => setTimeout(resolve, 380));
    }
    if (requestId !== requestIdRef.current) return;
    setMessages((current) => [
      ...current,
      {
        id: messageIdRef.current++,
        role: "assistant",
        text: reply.message,
        reply,
      },
    ]);
    setIsResponding(false);
    queueMicrotask(() => { if (requestId === requestIdRef.current && openRef.current) inputRef.current?.focus(); });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  function handleReplyAction(
    event: MouseEvent<HTMLAnchorElement>,
    action: AssistantAction,
  ) {
    if (action.kind !== "quote") return;

    const quoteIntake = document.querySelector<HTMLElement>("#quote-intake");
    const targetUrl = new URL(action.href, window.location.href);
    handleOpenChange(false);

    if (!quoteIntake || targetUrl.pathname !== window.location.pathname || targetUrl.search) return;

    event.preventDefault();
    window.history.replaceState(null, "", "#quote-intake");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    quoteIntake.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(() => {
      quoteIntake
        .querySelector<HTMLElement>("button, input, select, textarea, [tabindex]")
        ?.focus();
    }, 240);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="ai-assistant-shell" data-open={open}>
        <DialogTrigger asChild>
          <button
            aria-label={copy.openLabel}
            className="ai-assistant-launcher"
            data-assistant-launcher="true"
            type="button"
          >
            <span className="ai-assistant-launcher-icon" aria-hidden="true">
              <MessageSquare />
            </span>
            <span>{copy.launcher}</span>
            {unread && (
              <span
                aria-label={locale === "fr" ? "Nouveau message" : "New message"}
                className="ai-assistant-unread"
                data-assistant-unread="true"
              >
                1
              </span>
            )}
          </button>
        </DialogTrigger>
      </div>

      <DialogContent
        className="ai-assistant-panel"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          queueMicrotask(() => inputRef.current?.focus());
        }}
        showCloseButton={false}
      >
        <DialogHeader className="ai-assistant-header">
          <div className="ai-assistant-heading-row">
            <span className="ai-assistant-bot-mark" aria-hidden="true">
              <Bot />
            </span>
            <div>
              <DialogTitle>{copy.title}</DialogTitle>
              <span className="ai-assistant-status">
                <span aria-hidden="true" />
                {copy.status}
              </span>
            </div>
            <DialogClose asChild>
              <button aria-label={copy.close} className="ai-assistant-close" type="button">
                <X aria-hidden="true" />
              </button>
            </DialogClose>
          </div>
          <DialogDescription className="sr-only">{copy.description}</DialogDescription>
        </DialogHeader>

        <div
          aria-label={copy.conversation}
          aria-live="polite"
          aria-relevant="additions text"
          aria-busy={isResponding}
          className="ai-assistant-messages"
          role="log"
        >
          {messages.map((message) => (
            <div
              className={`ai-assistant-message is-${message.role}`}
              data-message-role={message.role}
              key={message.id}
            >
              {message.role === "assistant" && (
                <span className="ai-assistant-message-icon" aria-hidden="true">
                  <Bot />
                </span>
              )}
              {message.reply ? (
                <AssistantReplyCard
                  onAction={handleReplyAction}
                  reply={message.reply}
                />
              ) : message.role === "assistant" ? (
                <div className="assistant-reply-card">
                  <FormattedMessageText text={message.text} />
                </div>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          ))}
          {isResponding && (
            <div className="ai-assistant-thinking" role="status">
              <span aria-hidden="true"><i /><i /><i /></span>
              {copy.thinking}
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        <div className="ai-assistant-quick-section">
          <p>{copy.quickReplies}</p>
          <div className="ai-assistant-quick-replies">
            {quickReplies.map((reply) => (
              <button
                disabled={isResponding && !getAssistantReply(reply.value, locale).emergency}
                key={reply.id}
                onClick={() => submitMessage(reply.value)}
                type="button"
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        <form className="ai-assistant-composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="ai-assistant-input">
            {copy.inputLabel}
          </label>
          <input
            autoComplete="off"
            id="ai-assistant-input"
            maxLength={600}
            onChange={(event) => setInput(event.currentTarget.value)}
            placeholder={copy.placeholder}
            ref={inputRef}
            value={input}
          />
          <button
            aria-label={copy.send}
            disabled={!input.trim() || (isResponding && !getAssistantReply(input, locale).emergency)}
            type="submit"
          >
            <Send aria-hidden="true" />
          </button>
        </form>

        <p className="ai-assistant-disclaimer">{copy.disclaimer}{aiEnabled && (locale === "fr" ? " L’orientation IA envoie votre message à OpenAI; évitez les renseignements personnels." : " AI routing sends your message to OpenAI; avoid personal information.")}</p>
      </DialogContent>
    </Dialog>
  );
}
