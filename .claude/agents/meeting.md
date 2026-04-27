Used GPT 5.5 Thinking + Assembly AI's Transcription

Meeting summary

Jasmine walked Michael and Wayeez through the proposed SunOS architecture: a project operating system that centralizes project folders, requirements, references, roadmaps, feeds, and workflows.

The main idea is that each project, such as Sunspoke, lives inside a folder with structured source-of-truth files like design.md, tech.md, brand.md, product.md, launch.md, roadmap.md, and potentially website, deck, or prototype-related files. These files act as the core requirements layer for building products.

SunOS has several major parts:

Home
A desktop-style project dashboard showing folders, cover images, and last-updated timestamps.

Feed
An activity and approval layer. Transcripts, saves, Claude commits, and other changes appear here. The feed proposes requirement updates and lets the team approve all changes or review granular diffs before committing.

Sunpull
The memory/reference layer, similar to a Pinterest-style library. Saves from Instagram, links, competitors, brand references, tools, APIs, or ideas can be added to Sunpool and associated with projects. These saves can trigger suggested updates to requirement files.

Sunline
The project/task management layer. It should read roadmaps and requirements, generate weekly recommended tasks, and let the team accept or reject them. It should eventually function like a smarter task tracker connected to the project source of truth.

Sunrun / Missions
Workflow automation. Sunrun does not need its own main interface; it lives inside projects, Sunpool, and Sunline as executable missions or workflows. Examples include finding partnerships, generating marketing activation ideas, contacting vendors, creating JDs, or eventually automating engineering tasks.

The team aligned that SunOS should first be built as an internal operating system, not immediately as a customer-facing product. It could later support consulting, licensing to agencies, or fundraising for Sunspell/Sunspoke by demonstrating that the team has proprietary infrastructure for launching products quickly.

The near-term priority is to build the internal version around one project: Sunspoke. The team wants a hi-fi homepage/playground, centralized MD files, a working Sunpool database that can be texted into, and eventually automated transcript-to-requirement updates.

Michael emphasized the need to understand the technical architecture and where the centralized MD source of truth should live. He noted that building the team’s own repo/editor and MCP server may be necessary. Jasmine preferred having everything inside their own system rather than Slack Canvas or Notion.

Wayeez demonstrated progress with Paper/design automation. He has already built agent files, builders, and an audit agent that reviews the source of truth. The group agreed that strong requirements are essential because Paper can produce strong wireframes, prototypes, and possibly polished designs if the source of truth is clear enough.

The meeting ended with agreement to focus on a hi-fi SunOS/Sunspoke homepage, move the playground into a proper Sunspell GitHub, continue Sunpool database work, and centralize project requirements.





Key decisions

1. SunOS is the internal engine first.
Customer-facing simplification can come later.
2. Start with only one project: Sunspoke.
Do not overbuild multiple projects yet.
3. Requirements are the source of truth.
MD files should drive design, prototypes, roadmap generation, and future automation.
4. Requirement updates can come from three places:



Manual Claude commits
Meeting transcripts
Sunpool saves/references
5. Feed needs approval controls.
It should support both bulk approval and advanced granular diff review.
6. Sunrun comes later.
Sunpool and Sunline are higher priority because Sunrun depends on them.
7. Figma will be used lightly.
Jasmine may still use it for conceptual direction, but Paper/design automation should become the main production path.
8. Create separate GitHub structure.
The team should separate Aether and Sunspell work, with Sunspell having its own GitHub.





Tasks by person



Jasmine

Product architecture / requirements


Write the SunOS tech spec.
Define the structure of the project folder, especially what belongs inside each MD file.
Continue building the Sunspoke requirements/source-of-truth files.
Create the initial roadmap.md structure so it can later map into Sunline.
Define what fields/components are needed for the roadmap view.


Design direction


Finalize the hi-fi direction for the SunOS/Sunspoke homepage.
Provide Wayeez with the requirements and AD/design direction needed to build the homepage end to end.
Decide the highest-priority UI states for the homepage.
Define the project folder experience for Sunspoke, including tabs like requirements, roadmap, prototype, saves, missions, and team.


Feed / approval logic

• Specify how Feed should work:



Transcript-ready notifications
Proposed requirement changes
Bulk approve
Advanced granular approval
Diff review
Revert/version history behavior

Strategy

• Keep SunOS focused on internal use for now.
• Revisit later whether SunOS becomes:



Internal infrastructure
Licensed agency software
A fundraising narrative for Sunspoke/Sunspell
A consulting/production engine





Michael

Sunpool / database


Continue working on Sunpool as the highest immediate technical priority.
Get the Sunpool database to a point where the team can start texting into it.
Provide or expose the database in a way that Wayeez/Jasmine can eventually connect to the SunOS UI.
Help determine how saves get associated with projects like Sunspoke.


Centralized source of truth


Figure out where the MD files should live.
Evaluate/build the centralized system for requirements instead of relying on Slack Canvas, Notion, or scattered local files.
Explore building the internal repo/editor structure for project MD files.
Consider what is needed for an MCP server so Claude/clients can read and write to the source of truth.


GitHub / infrastructure


Help create or organize the Sunspell GitHub separately from Aether.
Support moving the current playground/prototype work into the Sunspell GitHub.
Help connect the centralized MD files to Claude or other AI clients.
Later, support transcript automation that can propose updates to requirements.


Sunline planning


Once Jasmine and Wayeez define the roadmap/task view, evaluate whether Aeon can read multiple MD files and generate weekly prioritized tasks.
Help design the extraction logic from roadmap.md into Sunline.






Wayeez

Design automation / Paper

• Continue using Paper to generate the SunOS/Sunspoke homepage at the highest fidelity possible.
• Build the homepage end to end, starting with the existing Sumani/SunOS home direction.
• Create all important UI states for the homepage:



One Sunspoke project tile/folder
Background color customization
Tabs visible
Search interaction
Click-through into Sunspoke
Placeholder/fake data where needed

Project folder UI


Work with Jasmine to design the inside of the Sunspoke folder.
Design the next-level folder experience after the homepage.
Include temporary/fake MD file content if the backend is not ready yet.
Build the visual structure for requirements, roadmap, saves, missions, and prototype areas.


Paper / source-of-truth workflow

• Keep improving the agent setup:



Builders
Audit agent
Source-of-truth review
• Add global requirements where possible:



Always design responsive views
Always prioritize the first-time-user happy path
Build wireframes in Paper first
Move greenlit wireframes into prototype
• Explore clickable prototype output from Paper.
• Continue testing whether Paper can move from wireframes into polished design based on stronger requirements.

GitHub


Move current playground work out of personal GitHub if needed.
Push the work into the new Sunspell GitHub once available.
Treat the Paper/design system as a real code project with source-of-truth files.






Shared/team tasks

Immediate priorities


Create the Sunspell GitHub.
Move the playground/prototype work into that repo.
Build a hi-fi SunOS homepage using only Sunspoke as the example project.
Centralize Sunspoke MD files in one place.
Connect or prepare the MD files so Claude/AI clients can access them.
Keep Sunpool database work moving so the team can start texting saves into it.
Design the Sunspoke folder view after the homepage.
Later, add transcript ingestion and requirement-update proposals through Feed.


Later priorities


Build Feed approval flows.
Build Sunline roadmap/task extraction.
Add weekly task recommendations.
Add Sunrun/Missions workflows.
Explore engineering automation.
Decide whether SunOS becomes external, licensed, or stays internal.