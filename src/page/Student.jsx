import TextBox from "../component/TextBox";
import {useEffect, useState} from "react";
import Quiz from "../component/Quiz";
import Chat from "../component/Chat";

const fetchedData = [
    {
        id: 'question-1',
        type: 1001,
        question: {
            content: "爸爸的爸爸叫什么？",
            options: [
                {
                    id: 1,
                    content: "爷爷",
                },
                {
                    id: 2,
                    content: "奶奶",
                },
                {
                    id: 3,
                    content: "外公",
                },
                {
                    id: 4,
                    content: "外婆",
                },
            ],
            answer: 1,
        },
        selection: {
            startPos: 0,
            endPos: 10,
            text: 'Hello World'
        },
    }
]

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
        setQuestionList(fetchedData.map((item) => {
            return {
                id: item.id,
                type: item.type,
                question: item.question,
            }
        }))
        setSelection(fetchedData.map((item) => {
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
        setSelection((prevSelection) =>
            prevSelection.map((item) => ({...item, isSelected: false}))
        );
    }

    const clickSelf = (callback, ...customParam) => (event) => {
        if (event.target === event.currentTarget) {
            callback(...customParam);
        } else {
            console.warn('clickSelf: event.target !== event.currentTarget')
        }
    };

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
                        isSelected: false,
                    }
                } else {
                    return selectionItem;
                }
            })
        })
    }

    return <div>
        <div className="flex flex-row h-screen">
            <div className="w-1/2 bg-blue-200">
                <TextBox
                    selection={selection}
                    onSelectionChange={handleSelectionClick}
                    onSelectionCreate={handleSelectionCreate}
                >
                    {(item, index) => {
                        return item.questionId ? <div>有题目</div> : [
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleTextBoxChatClick(item, index)}>
                                Chat
                            </button>
                        ]
                    }}
                </TextBox>
            </div>
            <div className="w-1/2 bg-white"
                 onClick={clickSelf(clearSelection)}
            >{
                questionList.map((item) => {
                    // 有黑色圆角border和padding的Quiz，当选中时，边框变为绿色
                    const isSelected = selection.find((selectionItem) =>
                        selectionItem.questionId === item.id)?.isSelected
                    const Component = QuestionComponentMap[item.type]
                    return <Component
                        className={"border-2  rounded-lg p-4 m-4 " +
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
