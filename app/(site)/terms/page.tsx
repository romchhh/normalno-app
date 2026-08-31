import { BRAND_NAME } from "@/lib/brand";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Публічна оферта
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Загальні положення</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ця публічна оферта (далі — &quot;Оферта&quot;) є офіційною пропозицією {BRAND_NAME} 
              (далі — &quot;Продавець&quot;) укласти договір купівлі-продажу автомобілів на умовах, 
              викладених нижче.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Акцептом цієї Оферти є здійснення Замовником дій, спрямованих на оформлення замовлення 
              та оплату товару, що означає повну згоду Замовника з умовами цієї Оферти.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Предмет договору</h2>
            <p className="text-gray-700 leading-relaxed">
              Продавець зобов&apos;язується передати у власність Замовнику автомобіль (товар), 
              а Замовник зобов&apos;язується прийняти товар та оплатити його на умовах цієї Оферти.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ціна та оплата</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ціна товару вказана на сайті в доларах США (USD). Остаточна ціна може змінюватися 
              залежно від курсу валют та умов доставки.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Оплата здійснюється згідно з умовами, зазначеними на сторінці &quot;Оплата&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Доставка</h2>
            <p className="text-gray-700 leading-relaxed">
              Умови доставки вказані на сторінці &quot;Доставка&quot;. Терміни та вартість доставки 
              розраховуються індивідуально для кожного замовлення.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Права та обов&apos;язки сторін</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Права Продавця:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Відмовити в оформленні замовлення у разі відсутності товару</li>
                  <li>Змінювати ціни на товари без попереднього повідомлення</li>
                  <li>Встановлювати обмеження на кількість товару в одному замовленні</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Права Замовника:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Отримати повну інформацію про товар</li>
                  <li>Відмовитися від замовлення до моменту оплати</li>
                  <li>Отримати товар у зазначений термін</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Відповідальність</h2>
            <p className="text-gray-700 leading-relaxed">
              Продавець не несе відповідальності за затримки доставки, спричинені діями третіх осіб 
              (перевізників, митних органів тощо). Продавець надає гарантію на автомобіль згідно 
              з чинним законодавством України.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Контактна інформація</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-2 text-gray-700">
              <p><strong>Назва:</strong> {BRAND_NAME}</p>
              <p><strong>Сайт:</strong> normalno-auto.com</p>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700 text-sm">
              <strong>Дата останнього оновлення:</strong> {new Date().toLocaleDateString("uk-UA", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

