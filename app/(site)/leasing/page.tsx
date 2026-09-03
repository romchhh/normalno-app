import { BRAND_NAME } from "@/lib/brand";

export default function LeasingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Авто в лізинг
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Пропозиції та умови</h2>
            <p className="text-gray-700 leading-relaxed">
              {BRAND_NAME} — лізингова компанія. Ми допомагаємо отримати авто зараз,
              а платити зручними щомісячними платежами під ваш бюджет.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Якщо немає всієї суми одразу — лізинг дає змогу користуватися авто
              вже сьогодні й розподілити вартість на зрозумілий термін.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Як працює лізинг</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Лізинг — це довгострокова оренда з можливістю викупу. Зазвичай термін
              становить 24–48 місяців. Протягом цього періоду ви користуєтесь авто
              і вносите платежі за договором. Основні переваги:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Щомісячні платежі часто нижчі, ніж у кредиті;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Можна зарахувати поточне авто як частину стартового внеску;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Підбір під комфортний платіж і бюджет на старті;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-1">•</span>
                <span>Прозорі умови без прихованих комісій — усе фіксуємо в договорі.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Лізинг або кредит</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Обидва варіанти дають змогу отримати авто без повної оплати одразу.
              Лізинг зазвичай зручніший за щомісячним платежем, кредит — якщо важлива
              миттєва власність на авто.
            </p>
            <p className="text-gray-700 leading-relaxed">
              {BRAND_NAME} допоможе підібрати програму під ваш запит. Уточнити ціни,
              умови та інші подробиці можна, зв&apos;язавшись з менеджером.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
