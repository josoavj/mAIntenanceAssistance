import { DiagnosticRAGOutput, TicketInput } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://fastapiformaintenance.onrender.com";

// Render met une instance gratuite en veille : le premier appel paie un cold start.
const TIMEOUT_MS = 45_000;

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function classifyTicket(
  input: TicketInput
): Promise<DiagnosticRAGOutput> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}/api/tickets/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new ApiError(
        `Analyse indisponible (HTTP ${res.status}). ${detail.slice(0, 300)}`,
        res.status
      );
    }

    return (await res.json()) as DiagnosticRAGOutput;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(`L'analyse a dépassé ${TIMEOUT_MS / 1000}s.`);
    }
    throw new ApiError(
      err instanceof Error ? err.message : "Erreur réseau inconnue"
    );
  } finally {
    clearTimeout(timer);
  }
}
