import java.util.*;

class AhoCorasick {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        TrieNode failureLink;
        List<Integer> output = new ArrayList<>();
    }

    private TrieNode root;
    private static String[] patterns = {"het", "ehehe", "his", "hers"};

    public AhoCorasick() {
        root = new TrieNode();
    }

    // Insert a pattern into the trie
    public void insert(String pattern, int index) {
        TrieNode current = root;
        for (char c : pattern.toCharArray()) {
            current = current.children.computeIfAbsent(c, k -> new TrieNode());
        }
        current.output.add(index);
    }

    // Build the failure links
    public void buildFailureLinks() {
        Queue<TrieNode> queue = new LinkedList<>();
        for (TrieNode child : root.children.values()) {
            child.failureLink = root;
            queue.add(child);
        }

        while (!queue.isEmpty()) {
            TrieNode current = queue.poll();
            for (Map.Entry<Character, TrieNode> entry : current.children.entrySet()) {
                char c = entry.getKey();
                TrieNode child = entry.getValue();
                TrieNode failure = current.failureLink;

                while (failure != null && !failure.children.containsKey(c)) {
                    failure = failure.failureLink;
                }

                child.failureLink = (failure == null) ? root : failure.children.get(c);
                if (child.failureLink != null) {
                    child.output.addAll(child.failureLink.output);
                }
                queue.add(child);
            }
        }
    }

    // Search for patterns in the text
    public void search(String text) {
        TrieNode current = root;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            while (current != null && !current.children.containsKey(c)) {
                current = current.failureLink;
            }
            current = (current == null) ? root : current.children.get(c);
            if (current != null) {
                for (int index : current.output) {
                    //System.out.println("Pattern found at index: " + (i - index));
                    System.out.println("Pattern " + index + " had been found at index: " + (i - patterns[index].length() + 1) + "!!!!");
                }
            }
        }
    }

    public static void main(String[] args) {
        AhoCorasick ac = new AhoCorasick();
        for (int i = 0; i < patterns.length; i++) {
            //ac.insert(patterns[i], patterns[i].length() - 1);
            ac.insert(patterns[i], i);
        }
        ac.buildFailureLinks();
        ac.search("ushehehehe");
    }
}