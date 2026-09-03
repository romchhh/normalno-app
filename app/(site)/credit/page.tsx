import { BRAND_NAME } from "@/lib/brand";

export default function CreditPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Авто в кредит або в лізинг
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Пропозиції та умови</h2>
            <p className="text-gray-700 leading-relaxed">
              {BRAND_NAME} допомагає отримати авто без повної оплати одразу —
              у лізинг або в кредит під ваш бюджет і комфортний щомісячний платіж.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Якщо машина потрібна зараз, а всієї суми немає — підберемо зручну
              програму фінансування.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Особливості кредиту на авто</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Кредит на авто має свої особливості порівняно з лізингом:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>На відміну від лізингу, машина з самого початку належить вам — потрібно лише своєчасно вносити оплату;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Можливість зробити початковий внесок — він зменшує щомісячні виплати;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Умови та ставка залежать від програми і вашого фінансового профілю;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Можна обрати як нове, так і вживане авто з каталогу.</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Щомісячні платежі за кредитом часто вищі, ніж за лізингом. Який варіант
              вигідніший — залежить від бюджету і ваших вимог. Менеджер допоможе порівняти.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Лізинг або кредит</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Оформлення фінансування потребує уваги до деталей і правильних документів.
              Ми беремо ці турботи на себе і супроводжуємо на кожному кроці.
            </p>
            <p className="text-gray-700 leading-relaxed">
              {BRAND_NAME} підбере умови під ваш запит. Уточнити ціни, терміни та
              інші подробиці можна, зв&apos;язавшись з менеджером.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
