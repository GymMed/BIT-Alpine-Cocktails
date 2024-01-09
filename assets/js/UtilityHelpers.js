class UtilityHelpers {
    constructor() {}

    static isNotEmptyArray(array) {
        if (!Array.isArray(array)) return false;
        if (array.length < 1) return false;
        return true;
    }

    static isEmptyArray(array) {
        if (!Array.isArray(array)) return false;

        if (array.length > 0) return false;
        return true;
    }
}
