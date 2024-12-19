class SplitInput {
    get(text) {
        let index = 0;
        let pre = 0;
        const res = [];
        while (index < text.length) {
            while ((text.charAt(index + 1) != '#' && text.charAt(index + 1) != '^') && (index < text.length - 1)) ++index;
            res.push(text.substring(pre, index + 1));
            index += 2;
            pre = index;
        }
        return res;

    }
}

export default SplitInput;