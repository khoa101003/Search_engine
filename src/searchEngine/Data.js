class Data {
    constructor(text) {
        this.text = text;
        this.start = 0;
        this.index = 0;
    }

    get(input) {
        const ans = input;
        //console.log("data: " + input.trans_no)
        this.index = input.position;
        while ((this.index > 0) && (this.text.charAt(this.index - 1) != '#')) {
            //console.log(this.text.charAt(this.index - 1))
            --this.index;
            //console.log(this.index);
        }
        this.start = this.index;
        while ((this.text.charAt(this.index + 1) != '^') && (this.index < this.text.length - 1)) ++this.index;
        //console.log(position)
        ans.time = this.text.substring(this.start, this.start + 10);

        this.start = this.index + 2;
        this.index += 2;
        while ((this.text.charAt(this.index + 1) != '^') && (this.index < this.text.length - 1)) ++this.index;
        ans.trans_no = this.text.substring(this.start, this.index + 1);

        this.start = this.index + 2;
        this.index += 2;
        while ((this.text.charAt(this.index + 1) != '^') && (this.index < this.text.length - 1)) ++this.index;
        ans.credit = this.text.substring(this.start, this.index + 1);

        this.start = this.index + 2;
        //this.index += 2;
        while ((this.text.charAt(this.index + 1) != '#') && (this.index < this.text.length - 1)) ++this.index;
        ans.detail = this.text.substring(this.start, this.index + 1);

        return ans;
    }
}

export default Data;