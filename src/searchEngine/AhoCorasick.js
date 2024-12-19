// src/services/AhoCorasick.js
class TrieNode {
    constructor() {
        this.children = {};
        this.output = [];
        this.failureLink = null;
    }
}

class AhoCorasick {
    constructor(patterns) {
        this.root = new TrieNode();
        console.log(patterns);
        this.buildTrie(patterns);
        this.buildFailureLinks();
    }

    buildTrie(patterns) {
        for (let index = 0; index < patterns.length; index++) {
            const pattern = patterns[index];
            if (pattern.length == 0) continue;
            let current = this.root;
            for (const char of pattern) {
                if (!current.children[char]) {
                    current.children[char] = new TrieNode();
                }
                current = current.children[char];
            }
            current.output.push(index);
        }
    }

    buildFailureLinks() {
        const queue = [];
        for (const child of Object.values(this.root.children)) {
            child.failureLink = this.root;
            queue.push(child);
        }

        while (queue.length > 0) {
            const current = queue.shift();
            for (const [char, child] of Object.entries(current.children)) {
                let failure = current.failureLink;
                while (failure && !failure.children[char]) {
                    failure = failure.failureLink;
                }
                child.failureLink = failure ? failure.children[char] : this.root;
                if (child.failureLink) {
                    child.output.push(...child.failureLink.output);
                }
                queue.push(child);
            }
        }
    }

    search(text) {
        let current = this.root;
        const results = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            while (current && !current.children[char]) {
                current = current.failureLink;
            }
            current = current ? current.children[char] : this.root;
            if (current) {
                for (const index of current.output) {
                    results.push({ pattern: index, position: i, time: '', trans_no: '', credit: '', detail: '' });
                }
            }
        }
        return results;
    }
}

export default AhoCorasick;