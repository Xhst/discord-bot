import en from '@assets/i18n/en.json';

export const arraySeparator = ' | ';

const translations: { [lang: string]: { [K in LanguageKey]: JsonLeaf } } = {
    en: flattenJSON(en),
};

/**
 * Get the translation for the given key in the current language.
 * 
 * @param key the flattened key in the JSON language file
 * @param language the language to get the translation for
 * @returns the value of the translation for the given key in the current language
 */
export function getTag(key: LanguageKey, language: string) {
    return translations[language.toLocaleLowerCase()][key]?.toString() 
        || translations['en'][key]?.toString() 
        || key;
}

/**
 * Get the translation for the given key in the current language and, if arguments are provided, format it with them.
 * 
 * @param key the flattened key in the JSON language file
 * @param args optional arguments to format the translation
 * @returns the translation for the given key in the current language
 */
export function i18n(key: LanguageKey, ...args: Array<string | number>): string {
    const language = getLanguage();

    const tag = getTag(key, language);

    try {
        // Replace placeholders (`${0}`, `${1}`, ... , `${n}`) with the corresponding arguments
        return tag.replace(/\$\{(\d+)\}/g, (match, index) => {
            const idx = parseInt(index);

            return args[idx] !== undefined ? String(args[idx]) : match;
        });
    } catch (error) {
        console.error(`Error while formatting i18n tag: ${tag}`);

        return tag;
    }
}

export function getLanguage(): string {
    return process.env.LANGUAGE || 'en';
}

/**
 * Flatten a JSON object to a single level object.
 * 
 * @param data the JSON object to flatten
 * @param parentKey the parent key of the current object
 * @param result the result object
 * @returns the flattened JSON object
 */
function flattenJSON(data: any, parentKey = '', result: { [key: string]: JsonLeaf } = {}): { [K in LanguageKey]: JsonLeaf } {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                flattenJSON(data[key], newKey, result);
            } else if (Array.isArray(data[key])) {
                result[newKey] = data[key].join(arraySeparator);
            } else {
                result[newKey] = data[key];
            }
        }
    }
    return result as { [K in LanguageKey]: JsonLeaf };
}

// Type definitions

type JsonLeaf = string | number | boolean | null | undefined;

type Join<K, P> = K extends JsonLeaf ?
    P extends JsonLeaf ?
    `${K}${"" extends P ? "" : "."}${P}`
    : never : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: K extends JsonLeaf ?
        `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never
    }[keyof T] : "";

type LanguageKey = Paths<typeof en>;
