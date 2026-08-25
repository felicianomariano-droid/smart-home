"use client";

import { useState } from "react";
import { Lightbulb, Power, Mic, MicOff } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Home() {
  const [ligada, setLigada] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Navegador não compatível
          </h1>

          <p className="text-slate-400 mt-2">
            Tenta usar o Google Chrome.
          </p>
        </div>
      </main>
    );
  }

  function iniciarVoz() {
    resetTranscript();

    SpeechRecognition.startListening({
      language: "pt-PT",
    });
  }

  function pararVoz() {
    SpeechRecognition.stopListening();
  }

  function executarComando() {
    const comando = transcript.toLowerCase();

    if (
      comando.includes("ligar") ||
      comando.includes("acender")
    ) {
      setLigada(true);
    }

    if (
      comando.includes("desligar") ||
      comando.includes("apagar")
    ) {
      setLigada(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* Cabeçalho */}
        <div className="mb-8">

          <p className="text-blue-400 text-sm font-medium">
            SMART HOME Feliciano
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Controle da Casa
          </h1>

          <p className="text-slate-400 mt-2">
            Controle sua iluminação por botão ou voz.
          </p>

        </div>

        {/* Cartão */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

          {/* Lâmpada */}
          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Lâmpada
              </p>

              <h2 className="text-2xl font-semibold mt-1">
                Sala
              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition ${
                ligada
                  ? "bg-yellow-400/20 text-yellow-300"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              <Lightbulb size={32} />
            </div>

          </div>

          {/* Estado */}
          <div className="mt-8 flex items-center gap-3">

            <span
              className={`w-3 h-3 rounded-full ${
                ligada
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            />

            <span className="text-lg">
              {ligada ? "Ligada" : "Desligada"}
            </span>

          </div>

          {/* Botão */}
          <button
            onClick={() => setLigada(!ligada)}
            className={`w-full mt-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition ${
              ligada
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >

            <Power size={22} />

            {ligada
              ? "Desligar lâmpada"
              : "Ligar lâmpada"}

          </button>

          {/* Voz */}
          <button
            onClick={
              listening
                ? pararVoz
                : iniciarVoz
            }
            className={`w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition ${
              listening
                ? "bg-red-500 hover:bg-red-600"
                : "border border-slate-700 hover:bg-slate-800"
            }`}
          >

            {listening ? (
              <>
                <MicOff size={22} />
                Parar de ouvir
              </>
            ) : (
              <>
                <Mic size={22} />
                Comando de voz
              </>
            )}

          </button>

          {/* Texto reconhecido */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-800">

            <p className="text-xs text-slate-400">
              COMANDO RECONHECIDO
            </p>

            <p className="mt-2 text-slate-200">
              {transcript || "Diga: ligar ou desligar"}
            </p>

          </div>

          {/* Executar */}
          {transcript && (
            <button
              onClick={executarComando}
              className="w-full mt-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
            >
              Executar comando
            </button>
          )}

        </div>

      </div>

    </main>
  );
}