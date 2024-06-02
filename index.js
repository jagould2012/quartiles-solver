import prompts from 'prompts';
import _ from 'lodash';
import fs from 'node:fs';
import wordListPath from 'word-list';
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

const fragments = [];

const MAX = 20;

let found = [];

async function main()
{
    for(let fragment=0; fragment < MAX; fragment++)
    {
        await getFragment(fragment);
    }

    _.each(fragments, (fragment)=>{
        if(_.indexOf(wordArray, fragment) > -1)
        {
            found.push(fragment);
        }
        _.each(fragments, (fragment2)=>{
            if(fragment2 == fragment)
            {
                return;
            }
            if(_.indexOf(wordArray, fragment + fragment2) > -1)
            {
                found.push(fragment + fragment2);
            }
            _.each(fragments, (fragment3)=>{
                if(fragment3 == fragment || fragment3 == fragment2)
                {
                    return;
                }
                if(_.indexOf(wordArray, fragment + fragment2 + fragment3 ) > -1)
                {
                    found.push(fragment + fragment2 + fragment3);
                }
                _.each(fragments, (fragment4)=>{

                    if(fragment4 == fragment3 || fragment4 == fragment2 || fragment4 == fragment)
                    {
                        return;
                    }
                    if(_.indexOf(wordArray, fragment + fragment2 + fragment3 + fragment4 ) > -1)
                    {
                        found.push(fragment + fragment2 + fragment3 + fragment4);
                    }
                })
            })
        })
    });

    console.log(found);
}


async function getFragment(index)
{
    const { value } = await prompts({
        type: 'text',
        name: 'value',
        message: `Enter fragment ${ index + 1}`,
        initial: fragments[index]
    });

    fragments[index] = value;
}


main();