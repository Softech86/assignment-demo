// 一个单选题的答题组件，基于radio。当选择正确按钮时，这行变绿，否则变红。
import {useEffect, useState} from "react";
import {getQuestionById} from "../mock";
import {stopPropagation} from "../util";

const Quiz = ({
                  id,
                  onChange,
                  onDelete,
                  ...Props
              }) => {
    // 只暴露id、列表操作给父级
    // 和列表无关的属性不暴露

    const [form, setForm] = useState({
        answer: null,
    })
    const [content, setContent] = useState('')
    const [options, setOptions] = useState([])
    const [answer, setAnswer] = useState(null)

    // 组件自己拉取页面数据
    useEffect(() => {
        const res = getQuestionById(id)
        setContent(res.content)
        setOptions(res.options)
        setAnswer(res.answer)
    }, [])

    const handleSave = () => {
        // 模拟提交表单，后端返回了入库的id
        // 只有教师端，未提交的表单需要这个接口
        const res = {
            id: 'quiz-' + Math.floor(Math.random() * 10000),
        }
        const {id} = res
        console.log('save', id)
        onChange({id})
    }

    return (
        // 用Props传递className，style等属性
        // 用于统一处理选中的高亮样式等
        // 这些ui的包装交给外层做，组件不必关心

        <div {...Props}>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSave}
                >保存
                </button>
                {' '}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onDelete({id})}
                >删除
                </button>
                <span className="float-right">{id}</span>
            </div>
            <div>{content}</div>

            <div className='bg-amber-50' onClick={stopPropagation()}>
                {
                    options.map((option) => {
                        return (
                            <div className="inline-block">
                                <div className="bg-lime-50"
                                >
                                    <input type="radio" id={option.id} name={id} value={option.id}
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
        </div>
    )
}
export default Quiz
