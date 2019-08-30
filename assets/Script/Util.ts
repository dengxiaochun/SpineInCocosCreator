class Util {
    public static readonly instance = new Util();

    random(min:number,max:number,integer = true) {
        const v = Math.random() * (max - min) + min;
        return integer ? Math.round(v) : v
    }

    randomExclude(min:number,max:number,exclude:number):number;
    randomExclude(min:number,max:number,exclude:number[]):number;

    randomExclude(min:number,max:number,exclude:number|number[]) {
        const v = Math.round(Math.random() * (max - min) + min);
        if (typeof exclude == 'number') {
            if (v == exclude) {
                return this.randomExclude(min,max,exclude)
            } else {
                return v
            }
        } else {
            if (exclude.indexOf(v) != -1) {
                return this.randomExclude(min,max,exclude)
            } else {
                return v;
            }
        }
    }

    randomBoolean() {
        return Math.random() > 0.5
    }

    randomArr(arr:number[],count:number) {
        let nums:number[] = []
        for (let i = 0; i < count; i++) {
            const n = this.random(0,arr.length - 1)
            nums[i] = arr[n]      
            arr.splice(n,1)
        }
        return nums;
    }

    shuffleArray(array:number[]) {
        let m = array.length,t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    
    arrDump(arr:any[],name = 'name',title = 'arr') {
        const s = arr.map((v)=>{
            return v[name]
        })

        cc.log(title,s)
    }


    ArrayShallowCopy(arr:any[]) {
        return arr.slice()
    }
}

export default Util.instance;