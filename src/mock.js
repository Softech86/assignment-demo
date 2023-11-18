export const mockData = [
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

export const getQuestionById = id => {
    return {
        ...JSON.parse(JSON.stringify(mockData[0].question)),
        content: mockData[0].question.content.replace(/爸爸/g,
            '妈妈 爷爷 奶奶 外公 外婆'.split(' ')[Math.floor(Math.random() * 5)]
        ),
    }
}
