# Localization

Learning Vault uses lesson-level localization for selected lessons only.

English is the default language. Shader and VFX lessons stay English-only unless a future task says otherwise. Tarot-type lessons can add Thai or other translations when they are planned for localization.

## Editing A Localized Lesson

Localized copy lives in `src/content/locales/<lesson-slug>/`.

For example:

```text
src/content/locales/major-arcana-overview/en.json
src/content/locales/major-arcana-overview/th.json
```

To localize a page:

1. Copy the English JSON file to the target language file.
2. Translate string values only.
3. Keep object keys unchanged.
4. Keep arrays in the same order unless the component explicitly supports a different order.
5. Keep card proper names in English unless there is a deliberate tarot-specific reason to change them.

Do not add full app-wide i18n until multiple unrelated pages need routing, metadata, or navigation-level language switching. A per-lesson JSON file is easier to maintain for the current project.
