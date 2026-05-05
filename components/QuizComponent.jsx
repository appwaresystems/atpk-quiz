'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions, totalQuestions } from '@/data/questions'

export default function QuizComponent() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [userName, setUserName] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const name = localStorage.getItem('userName')
        if (!name) {
            router.push('/')
        } else {
            setUserName(name)
        }
    }, [router])

    const handleAnswer = (selectedIndex) => {
        setSelectedOption(selectedIndex)

        const isCorrect =
            selectedIndex === questions[currentQuestion].correctAnswer

        setTimeout(() => {
            const newAnswers = [...answers, selectedIndex]
            setAnswers(newAnswers)

            if (isCorrect) {
                setScore(prev => prev + 1)
            }

            setSelectedOption(null)

            if (currentQuestion + 1 < totalQuestions) {
                setCurrentQuestion(prev => prev + 1)
            } else {
                setIsFinished(true)
            }
        }, 500)
    }

    const handleRestart = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setScore(0)
        setIsFinished(false)
        setSelectedOption(null)
    }

    const handleExit = () => {
        localStorage.removeItem('userName')
        router.push('/')
    }

    if (!userName) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-xl">Բեռնում...</div>
            </div>
        )
    }

    if (isFinished) {
        let message = ''

        if (score >= 8 && score <= 10) {
            message =
                "Դու ծնվել ես ծրագրավորող: Քո ուղեղն աշխատում է ալգորիթմներով: Սպասում ենք քեզ մեր լսարանում"
        } else if (score >= 5 && score <= 7) {
            message =
                "Դու ստեղծագործ մարդ ես: Ծրագրավորումը քեզ կօգնի քո գաղափարները դարձնել իրականություն: Արի՛, կսովորեցնենք"
        } else {
            message = "Սկզբում կարող է դժվար թվալ, բայց մի հանձնվիր՝ դու հաստատ կկարողանաս։ Սպասում ենք քեզ ՏՀՏ բաժնում"
        }

        const percentage = (score / totalQuestions) * 100

        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🎉</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Քվիզն ավարտված է
                        </h1>
                        <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <p className="text-lg text-gray-700">
                                <span className="font-semibold">Մասնակից՝</span> {userName}
                            </p>
                            <p className="text-lg text-gray-700 mt-2">
                                <span className="font-semibold">Արդյունք՝</span> {score} / {totalQuestions}
                            </p>
                            <p className="text-lg text-gray-700 mt-2">
                                <span className="font-semibold">Տոկոսային հարաբերություն՝</span>{' '}
                                {percentage.toFixed(1)}%
                            </p>
                        </div>

                        <div
                            className={`text-center p-6 rounded-xl ${
                                score >= 8
                                    ? 'bg-green-100 text-green-800'
                                    : score >= 5
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                            }`}
                        >
                            <p className="text-xl font-semibold">{message}</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleRestart}
                                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Կրկին անցնել քվիզը
                            </button>
                            <button
                                onClick={handleExit}
                                className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                            >
                                Դուրս գալ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const currentQ = questions[currentQuestion]
    const progress = (currentQuestion / totalQuestions) * 100

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                            Հարց {currentQuestion + 1} / {totalQuestions}
                        </span>
                        <span>Մասնակից՝ {userName}</span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    {currentQ.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                selectedOption === null && handleAnswer(index)
                            }
                            disabled={selectedOption !== null}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-black ${
                                selectedOption === null
                                    ? 'border-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-indigo-600'
                                    : selectedOption === index
                                        ? index === currentQ.correctAnswer
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-red-500 bg-red-50'
                                        : index === currentQ.correctAnswer
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 opacity-50'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="text-center text-sm text-gray-500">
                    Ընտրեք ճիշտ պատասխանը
                </div>
            </div>
        </div>
    )
}