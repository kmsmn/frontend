import { useContext } from "react";
import { DataContext } from "./Day";
import NoWords from "./sub/NoWords";
import Word from "./Word";

export default function WordsList(){
    const [words, ] = useContext(DataContext);

    if (words==='none'){
        return <NoWords />  
    }

    return(
        <div className='WordsList'>
            <ul>
                {words.map(word => (
                    <Word key={word.id} word={word} />
                ))}
            </ul>
        </div>
    )
}
