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
    openLabel: "Ouvrir l’assistant Éclipse",
    title: "Assistant Éclipse",
    description: "Orientation automatique pour vos besoins électriques",
    status: "Réponses instantanées · 24/7",
    close: "Fermer l’assistant",
    conversation: "Conversation avec l’assistant Éclipse",
    quickReplies: "Choisissez un sujet",
    inputLabel: "Votre message",
    placeholder: "Décrivez votre besoin…",
    send: "Envoyer",
    thinking: "L’assistant prépare une réponse…",
    disclaimer: "Assistant automatique · Orientation générale, sans diagnostic à distance.",
  },
  en: {
    launcher: "24/7 assistant",
    openLabel: "Open the Éclipse assistant",
    title: "Éclipse assistant",
    description: "Automated guidance for your electrical needs",
    status: "Instant replies · 24/7",
    close: "Close the assistant",
    conversation: "Conversation with the Éclipse assistant",
    quickReplies: "Choose a topic",
    inputLabel: "Your message",
    placeholder: "Describe what you need…",
    send: "Send",
    thinking: "The assistant is preparing a reply…",
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
        <p>{reply.message}</p>
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
      <p>{reply.message}</p>
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
  const responseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const quickReplies = getAssistantQuickReplies(locale);

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [isResponding, messages, open]);

  function handleOpenChange(nextOpen: boolean) {
    dispatch({ type: nextOpen ? "open" : "close" });
    if (nextOpen) setUnread(false);
  }

  function submitMessage(rawMessage: string) {
    const text = rawMessage.trim();
    if (!text || isResponding) return;

    const userMessage: ConversationMessage = {
      id: messageIdRef.current++,
      role: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsResponding(true);

    responseTimerRef.current = setTimeout(() => {
      const reply = getAssistantReply(text, locale);
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
      responseTimerRef.current = null;
      queueMicrotask(() => inputRef.current?.focus());
    }, 320);
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
    dispatch({ type: "close" });

    if (!quoteIntake || targetUrl.pathname !== window.location.pathname) return;

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
          <DialogDescription>{copy.description}</DialogDescription>
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
                disabled={isResponding}
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
            disabled={!input.trim() || isResponding}
            type="submit"
          >
            <Send aria-hidden="true" />
          </button>
        </form>

        <p className="ai-assistant-disclaimer">{copy.disclaimer}</p>
      </DialogContent>
    </Dialog>
  );
}
