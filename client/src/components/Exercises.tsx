import { Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerForm } from "./AnswerForm";
import { Answer } from "./Answer";
import { W3Button } from "./W3Button";


export type TAnswer = {
    id?: string,
    text: string,
    isCorrect: boolean
}


export const Exercises = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState<TAnswer[]>([])
    const [answer, setAnswer] = useState({ isCorrect: false, text: '' })

    const [isAddingAnswer, setIsAddingAnswer] = useState(false)
    const updateAnswer = ({ id, isCorrect }: Omit<Required<TAnswer>, "text">) => {
        setAnswers(
            answers.map(ans => {
                if (ans.id === id) {
                    ans.isCorrect = isCorrect
                    return ans
                }
                return ans
            }))
    }

    return <div>
        <h1>Add exercises to a lesson {id}</h1>
        <div>
            <div>
                <Text>Question</Text>
                <TextField.Input
                    variant="surface"
                    size="3"
                    defaultValue={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    placeholder="name"
                />
            </div>
            <div>
                <Text>Answers</Text>
                {answers.map(ans => <Answer key={ans.id} answer={ans} updateAnswer={updateAnswer} />)}
            </div>
            <br />
            <AnswerForm setAnswers={setAnswers} answer={answer} setAnswer={setAnswer} setIsAddingAnswer={setIsAddingAnswer} isAddingAnswer={isAddingAnswer} />
        </div>
        <Flex mt='4'>
            <W3Button
                action={async (contract) => { contract.call("addExercise", [id, question, answers.map(({ text }) => text), answers.map(({ isCorrect }) => isCorrect)]).then(() => navigate(`/lessons/${id}`)); }}
            >
                save question
            </W3Button>
        </Flex>
    </div>


}

