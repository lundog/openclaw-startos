import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.3:0',
  releaseNotes: {
    en_US: `Updates OpenClaw to 2026.9.3.

Updates are safer: core and plugin changes are rehearsed in isolated state before they go live, and an interrupted update can be recovered without stopping a healthy Gateway. Warm prompt caches now survive, and cold sessions and memory search do less redundant work.

Also new: skills live in one persistent per-agent collection, sessions can be published as a revocable read-only transcript link, saved meeting notes are searchable and exportable, and provider accounts and their priority are managed in Models settings.

The container now runs Node 26. OpenClaw 2026.9.3 no longer supports Node 22.

**OpenClaw 2026.9.3 includes database migrations and config changes.** If the service fails to start, check the logs and use the "Repair OpenClaw" action to run "openclaw doctor". If the logs mention a session import, use the same action to run "openclaw doctor --session-sqlite".

**The SimpleX channel plugin must be updated afterwards to 2.0.0.** If you use SimpleX, submit the Configure SimpleX action after updating — the service raises a task to remind you.

[Full OpenClaw release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)`,
    es_ES: `Actualiza OpenClaw a la 2026.9.3.

Las actualizaciones son más seguras: los cambios del núcleo y de los complementos se ensayan en un estado aislado antes de activarse, y una actualización interrumpida puede recuperarse sin detener un Gateway en buen estado. Las cachés de prompts en caliente ahora se conservan, y las sesiones frías y la búsqueda en memoria hacen menos trabajo redundante.

Novedades: las habilidades viven en una única colección persistente por agente, las sesiones pueden publicarse como un enlace de transcripción de solo lectura y revocable, las notas de reuniones guardadas se pueden buscar y exportar, y las cuentas de proveedor y su prioridad se gestionan en los ajustes de Modelos.

El contenedor ahora ejecuta Node 26. OpenClaw 2026.9.3 ya no admite Node 22.

**OpenClaw 2026.9.3 incluye migraciones de base de datos y cambios de configuración.** Si el servicio no arranca, revisa el registro y usa la acción «Reparar OpenClaw» para ejecutar "openclaw doctor". Si el registro menciona una importación de sesiones, usa la misma acción para ejecutar "openclaw doctor --session-sqlite".

**El complemento del canal SimpleX debe actualizarse después a la versión 2.0.0.** Si usas SimpleX, ejecuta la acción Configurar SimpleX tras actualizar: el servicio crea una tarea para recordártelo.

[Notas completas de OpenClaw](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)`,
    de_DE: `Aktualisiert OpenClaw auf 2026.9.3.

Updates sind sicherer: Kern- und Plugin-Änderungen werden in isoliertem Zustand geprobt, bevor sie aktiv werden, und ein abgebrochenes Update lässt sich wiederherstellen, ohne ein funktionierendes Gateway zu stoppen. Warme Prompt-Caches bleiben jetzt erhalten, und Kaltstart-Sitzungen sowie die Speichersuche leisten weniger überflüssige Arbeit.

Ebenfalls neu: Skills liegen in einer dauerhaften Sammlung pro Agent, Sitzungen lassen sich als widerrufbarer, schreibgeschützter Transkript-Link veröffentlichen, gespeicherte Besprechungsnotizen sind durchsuchbar und exportierbar, und Anbieterkonten samt Priorität werden in den Modell-Einstellungen verwaltet.

Der Container läuft jetzt mit Node 26. OpenClaw 2026.9.3 unterstützt Node 22 nicht mehr.

**OpenClaw 2026.9.3 enthält Datenbankmigrationen und Konfigurationsänderungen.** Startet der Dienst nicht, prüfe das Protokoll und nutze die Aktion „OpenClaw reparieren", um "openclaw doctor" auszuführen. Nennt das Protokoll einen Sitzungsimport, führe mit derselben Aktion "openclaw doctor --session-sqlite" aus.

**Das SimpleX-Kanal-Plugin muss anschließend auf 2.0.0 aktualisiert werden.** Wenn du SimpleX nutzt, führe nach dem Update die Aktion „SimpleX konfigurieren" aus — der Dienst erstellt dafür eine Aufgabe als Erinnerung.

[Vollständige OpenClaw-Release-Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)`,
    pl_PL: `Aktualizuje OpenClaw do 2026.9.3.

Aktualizacje są bezpieczniejsze: zmiany w rdzeniu i wtyczkach są testowane w izolowanym stanie przed uruchomieniem, a przerwaną aktualizację można odzyskać bez zatrzymywania sprawnego Gatewaya. Ciepłe pamięci podręczne promptów są teraz zachowywane, a zimne sesje i wyszukiwanie w pamięci wykonują mniej zbędnej pracy.

Ponadto: umiejętności znajdują się w jednej trwałej kolekcji na agenta, sesje można opublikować jako odwoływalny link do transkrypcji tylko do odczytu, zapisane notatki ze spotkań można przeszukiwać i eksportować, a konta dostawców i ich priorytet są zarządzane w ustawieniach Modeli.

Kontener działa teraz na Node 26. OpenClaw 2026.9.3 nie obsługuje już Node 22.

**OpenClaw 2026.9.3 zawiera migracje bazy danych i zmiany konfiguracji.** Jeśli usługa nie startuje, sprawdź dziennik i użyj akcji „Napraw OpenClaw", aby uruchomić "openclaw doctor". Jeśli dziennik wspomina o imporcie sesji, tą samą akcją uruchom "openclaw doctor --session-sqlite".

**Wtyczkę kanału SimpleX trzeba następnie zaktualizować do wersji 2.0.0.** Jeśli używasz SimpleX, po aktualizacji uruchom akcję Konfiguruj SimpleX — usługa utworzy zadanie przypominające.

[Pełne informacje o wydaniu OpenClaw](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)`,
    fr_FR: `Met à jour OpenClaw vers la 2026.9.3.

Les mises à jour sont plus sûres : les changements du cœur et des plugins sont répétés dans un état isolé avant activation, et une mise à jour interrompue peut être récupérée sans arrêter une passerelle en bon état. Les caches de prompts chauds sont désormais préservés, et les sessions froides comme la recherche en mémoire effectuent moins de travail redondant.

Également nouveau : les compétences résident dans une collection persistante par agent, une session peut être publiée sous forme de lien de transcription en lecture seule et révocable, les notes de réunion enregistrées sont consultables et exportables, et les comptes de fournisseurs ainsi que leur priorité se gèrent dans les réglages Modèles.

Le conteneur fonctionne désormais avec Node 26. OpenClaw 2026.9.3 ne prend plus en charge Node 22.

**OpenClaw 2026.9.3 comporte des migrations de base de données et des changements de configuration.** Si le service ne démarre pas, consultez les journaux et utilisez l'action « Réparer OpenClaw » pour exécuter "openclaw doctor". Si les journaux évoquent un import de sessions, lancez "openclaw doctor --session-sqlite" avec la même action.

**Le plugin du canal SimpleX doit ensuite être mis à jour vers la 2.0.0.** Si vous utilisez SimpleX, lancez l'action Configurer SimpleX après la mise à jour : le service crée une tâche pour vous le rappeler.

[Notes de version complètes d'OpenClaw](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)`,
  },
  migrations: {
    // Rolling back to 2026.7.1 is not survivable. 2026.9.3 migrates the state
    // database and converts the legacy JSON session store to SQLite.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
