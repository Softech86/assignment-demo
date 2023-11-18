import TextBox from "../component/TextBox";
import {useEffect, useState} from "react";
import Quiz from "../component/Quiz";
import Chat from "../component/Chat";
import {mockData} from "../mock";
import {clickSelf, stopPropagation} from "../util";

const QuestionType = Object.freeze({
    Quiz: 1001,
    Chat: 2001,
})

const QuestionComponentMap = {
    [QuestionType.Quiz]: Quiz,
    [QuestionType.Chat]: Chat,
}

const createQuestion = (type) => {
    switch (type) {
        case QuestionType.Chat:
            return {
                type,
                id: 'question-' + Math.random(),
            }
        default:
            throw new Error(`Unknown type: ${type}`)
    }
}

const Student = () => {

    const [questionList, setQuestionList] = useState([])
    const [selection, setSelection] = useState([])

    useEffect(() => {
        setQuestionList(mockData.map((item) => {
            return {
                id: item.id,
                type: item.type,
                question: item.question,
            }
        }))
        setSelection(mockData.map((item) => {
            return {
                ...item.selection,
                questionId: item.id,
                isSelected: false,
            }
        }))
    }, [])

    const handleSelectionClick = (index, isSelected) => {
        setSelection((prevSelection) => {
            return prevSelection.map((item, itemIndex) => {
                if (itemIndex === index) {
                    return {
                        ...item,
                        isSelected,
                    }
                } else {
                    return {
                        ...item,
                        isSelected: false,
                    };
                }
            })
        })
    };

    const handleSelectionCreate = (startPos, endPos, text) => {
        setSelection((prevSelection) => {
            const id = prevSelection.length + 1;
            return [
                ...prevSelection.map((item) => ({...item, isSelected: false})),
                {
                    startPos,
                    endPos,
                    id,
                    isSelected: true,
                    text
                }
            ]
        })
    }

    const handleQuestionClick = (question, isSelected) => {
        const selectionIndex = selection.findIndex((item) => item.questionId === question.id)
        handleSelectionClick(selectionIndex, !isSelected)
    }

    const clearSelection = () => {
        console.log('clearSelection')
        setSelection((prevSelection) =>
            prevSelection.map((item) => ({...item, isSelected: false}))
        );
    }


    const handleTextBoxChatClick = (item, index) => {
        const newQuestion = createQuestion(QuestionType.Chat)

        setQuestionList((prevQuestionList) => {
            return [
                ...prevQuestionList,
                newQuestion
            ]
        })
        setSelection((prevSelection) => {
            return prevSelection.map((selectionItem, selectionIndex) => {
                if (selectionIndex === index) {
                    return {
                        ...selectionItem,
                        questionId: newQuestion.id,
                        isSelected: true,
                    }
                } else {
                    return {
                        ...selectionItem,
                        isSelected: false,
                    };
                }
            })
        })
    }

    return <div>
        <div className="flex flex-row h-screen">
            <div className="w-1/2 pl-4 pr-4"
                 onClick={clickSelf(clearSelection)}
            >
                <TextBox
                    selection={selection}
                    onSelectionChange={handleSelectionClick}
                    onSelectionCreate={handleSelectionCreate}
                >
                    {(item, index) => {
                        return item.questionId ? <div>有题目</div> : [
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={stopPropagation(handleTextBoxChatClick, item, index)}>
                                Chat
                            </button>
                        ]
                    }}
                </TextBox>
            </div>
            <div className="w-1/2" style={{backgroundColor: '#F4F4F9'}}
                 onClick={clickSelf(clearSelection)}
            >{
                questionList.map((item) => {
                    // 有黑色圆角border和padding的Quiz，当选中时，边框变为绿色
                    const isSelected = selection.find((selectionItem) =>
                        selectionItem.questionId === item.id)?.isSelected
                    const Component = QuestionComponentMap[item.type]
                    return <Component
                        className={"border-2 bg-white rounded-lg p-4 m-4 " +
                            (isSelected ? "border-yellow-400" : "border-gray-100")
                        }
                        onClick={clickSelf(handleQuestionClick, item, isSelected)}
                        options={item.question}
                        key={item.id}/>
                })
            }
            </div>
        </div>
    </div>
}

export default Student
