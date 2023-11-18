// 一个单选题的答题组件，基于radio。当选择正确按钮时，这行变绿，否则变红。
import {useState} from "react";

const Quiz = ({options: {content, options, answer}, ...Props}) => {
    const [form, setForm] = useState({
        answer: null,
    })
    return (
        <div {...Props}>
            <div>{content}</div>
            {
                options.map((option) => {
                    return (
                        <div className="inline-block">
                            <div className="bg-lime-50"
                            >
                                <input type="radio" id={option.id} name="quiz" value={option.id}
                                       onChange={(e) => setForm({
                                           ...form,
                                           answer: +e.target.value,
                                       })}/>
                                <label htmlFor={option.id}
                                       style={{
                                           color: form.answer === option.id ? (form.answer == answer ? 'green' : 'red') : 'black',
                                       }}
                                >{option.content}</label>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Quiz
