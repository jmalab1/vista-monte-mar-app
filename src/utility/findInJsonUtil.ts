// Define a type that represents a generic object with any structure
type JsonObject = {
    [key: string]: any;
};

/**
 * Recursively searches for an object within a multi-level JSON structure where a property matches a specific value.
 * @param obj - The JSON object to search within.
 * @param key - The property name to match.
 * @param value - The value to match for the given property.
 * @returns The object that contains the key with the matching value or null if not found.
 */
export function findInJson(obj: JsonObject, key: string, value: any): JsonObject | null {
    if (typeof obj !== 'object' || obj === null) {
        return null;
    }

    // Check if the current object has the key with the specified value
    if (obj.hasOwnProperty(key) && obj[key] === value) {
        return obj;
    }

    // Recursively search through object properties
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
            let result = findInJson(obj[prop], key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}
