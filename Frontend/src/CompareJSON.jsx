import { diff } from 'json-diff-ts';

export default function CompareJSON(res1,res2){
    const diffs = diff(res2, res1, { embeddedObjKeys: { characters: 'id' } });
    // console.log(diffs);
    return diffs;
}