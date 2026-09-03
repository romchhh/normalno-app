"use client";

import { useState } from "react";

import { BRAND_NAME } from "@/lib/brand";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Що таке авто в лізинг?",
    answer:
      "Лізинг — це довгострокова оренда авто з можливістю викупу. Ви користуєтесь автомобілем і сплачуєте зручні щомісячні платежі, а після закінчення договору можете викупити авто або повернути його.",
  },
  {
    question: "Які документи потрібні для оформлення?",
    answer:
      "Зазвичай достатньо паспорта та ІПН. Точний перелік залежить від обраної програми — менеджер підкаже індивідуально.",
  },
  {
    question: "Чи потрібен початковий внесок?",
    answer:
      "Так, більшість програм передбачає стартовий внесок. Його розмір залежить від вартості авто, терміну та вашого бюджету. Можна також зарахувати ваше поточне авто як частину внеску.",
  },
  {
    question: "На який термін можна оформити лізинг?",
    answer: "Найчастіше доступні терміни 24, 36 або 48 місяців. Конкретні умови підбираємо під ваш запит.",
  },
  {
    question: "Чи можна підібрати авто під мій щомісячний платіж?",
    answer: `Так. У ${BRAND_NAME} є швидкий підбір: ви вказуєте комфортний платіж і бюджет на старті — ми показуємо релевантні варіанти з каталогу.`,
  },
  {
    question: "Чим лізинг відрізняється від кредиту?",
    answer:
      "У лізингу авто оформлюється на лізингову компанію до повного викупу, а щомісячні платежі часто нижчі. У кредиті авто одразу у власності позичальника, але фінансове навантаження зазвичай вище. Підкажемо, що вигідніше саме вам.",
  },
  {
    question: "Як відбувається оформлення?",
    answer:
      "1) Обираєте авто з каталогу або через підбір; 2) Узгоджуєте умови з менеджером; 3) Підписуєте договір; 4) Вносите стартовий платіж і отримуєте авто.",
  },
  {
    question: "Які гарантії?",
    answer: `Умови фіксуються в договорі. ${BRAND_NAME} супроводжує клієнта на всіх етапах — від підбору до передачі авто та подальших консультацій.`,
  },
  {
    question: "Чи можна достроково викупити авто?",
    answer:
      "Так, у більшості програм передбачений достроковий викуп. Деталі та суму залишку підкаже менеджер.",
  },
  {
    question: "Чи авто вже в Україні?",
    answer:
      "У каталозі є авто, готові до оформлення. Якщо потрібна доставка в інше місто — організуємо індивідуально.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 text-center">
          Часті запитання
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-brand to-transparent rounded-full mx-auto mb-8"></div>
        
        <div className="bg-white rounded-2xl shadow-sm">
          {faqData.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 border-b border-gray-200 last:border-b-0"
              >
                <span className="font-semibold text-gray-900 text-base md:text-lg flex-1">
                  {item.question}
                </span>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {openIndex === index ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
