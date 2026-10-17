# Notes for Claude working on pregnancyrights.law

This site is a top-of-funnel intake site for pregnancy discrimination clients of Centurion Trial Attorneys, APC (Attorney Ryan Stygar; featured attorney Danielle Rini). Its job is to help pregnant workers, new parents, and working mothers in California understand their rights (pregnancy discrimination, Pregnancy Disability Leave, CFRA bonding leave, accommodations and the Pregnant Workers Fairness Act, lactation rights and the PUMP Act, reproductive loss leave, retaliation) and click through to the intake form.

**Swapping the intake form:** change `intake_url` (and `intake_provider`, used on the privacy page) in `src/site.json`, then build. Every button on the site reads from those two fields.

## Rules

- Never publish without Ryan's approval. New drafts go to Ryan's Command Center (https://claude.ai/artifact/Sf2QQGWZXyWDQkdeVF3RX7) as `pending` items with site `pregnancy-rights`. When he approves one there, the Command Center publisher task writes it to `src/articles/`, builds, and pushes to main.
- This is attorney advertising under the California Rules of Professional Conduct (rules 7.1-7.5). No guarantees, no unverifiable superlatives ("best," "top-rated"), no case results without the "prior results" disclaimer (results come only from `src/site.json`), no fee claims beyond: "No fee unless we win: clients pay no fees or costs if there is no recovery." Never "free consultation." Buttons say "Get help now."
- Verify every statute, regulation, and case citation against a primary or official source (leginfo.legislature.ca.gov, law.cornell.edu, courts.ca.gov, calcivilrights.ca.gov, eeoc.gov) before using it. If it can't be verified, leave it out. Ryan checks every cite.
- California employees only. Federal law is fine where it applies in California.
- Keep the site accessible (the Accessibility statement promises WCAG 2.1 AA): alt text, headings in order, text contrast of at least 4.5:1, keyboard access. Don't remove the accessibility options panel.
- Readers may be pregnant, exhausted, recently fired, or grieving a pregnancy loss. Be direct and warm, never clinical, graphic, or blaming. Reproductive loss content is gentle and practical.
- Photos: use Unsplash only (search via the API with the key in the weekly task), hotlink the image URL, credit "Stock photo. Photo by <name> on Unsplash" through the `image`, `image_alt`, `image_credit`, `image_credit_user` front matter fields, and call the photo's download_location once. Never show a real person from a news story, and never use an image of a pregnancy loss.
- Danielle's verified bio focuses on sexual harassment and workplace abuse. Don't describe her as a pregnancy specialist unless Ryan confirms it.

## "In the news" write-ups (category: news)

- Cover real, significant pregnancy discrimination, accommodation, lactation, or working-parent cases or developments: verdicts, settlements, lawsuits filed, EEOC or Civil Rights Department actions, new laws and regulations. Prefer California and nationally significant cases.
- Every fact comes from a reputable news outlet or court/agency record, linked in the article. Use at least two sources when possible.
- Allegations are allegations: say "alleges," "according to the complaint," and include the other side's response or that it didn't comment. Never state that a named employer or person discriminated unless a court, jury, or agency found it, or they admitted it.
- Don't name or identify workers who haven't identified themselves publicly, and never discuss anyone's medical details beyond what they made public.
- End with a "What this means for California workers" section that ties the case to California law.

## Voice

Direct second person, plain English, short punchy sentences without stacking one-line fragments. Pro-worker and steady. No profanity. Avoid "very" as an intensifier, repeated "own," overused em dashes (commas or parentheses instead), "here's the kicker," manufactured suspense, "not X, it's Y" constructions, and stock AI vocabulary.

## Article format

- File: `src/articles/<slug>.md`, front matter `title`, `description` (under 160 characters), `date`, `category` (`guide` or `news`), optional `updated`, `author` (team id; default in site.json), `status`.
- Bylines: every 4th article goes to Danielle Rini (`author: danielle-rini`); the rest are Ryan's (`ryan-stygar`). Number each new article by counting the files in `src/articles/` plus any pregnancy-rights items in the Command Center that are still `pending`, `approved`, or `changes`. The new article gets the next number. If that number is divisible by 4 (4, 8, 12...), use Danielle's byline. On a day with two articles, number the guide first, then the news write-up. Ryan reviews every article before it publishes, whoever the byline names.
- Guides: title is the plain question a worker would search. Open with the `<div class="tldr" markdown="1">` block that answers it in 2-3 sentences. Question-style `##` headings, citations in parentheses.
- Link to at least one existing guide. 700-1,200 words. Check `src/articles/` so topics don't overlap. Topics come from `src/topics.md`.
- `build.py` adds the closing callout and disclaimer; don't add another.

## Publishing steps

1. Weekly task: write the drafts, confirm `python3 build.py` builds, and create `pending` items in the Command Center. Don't commit.
2. Publisher task: write approved items to `src/articles/<slug>.md` exactly as Ryan left them, check off guide topics in `src/topics.md`, build, commit `src/` and `public/`, and push to main.
