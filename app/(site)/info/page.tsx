import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
          Інформація
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Про компанію</h2>
            <p className="text-gray-700 leading-relaxed">
              {BRAND_NAME} — лізингова компанія. {BRAND_TAGLINE}. Ми допомагаємо
              клієнтам обрати авто під бюджет і комфортний щомісячний платіж
              та супроводжуємо на кожному етапі — від підбору до оформлення.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Наші переваги</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏁</span>
                <span>Перевірені авто з прозорою історією</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <span>Зрозумілі умови лізингу без прихованих платежів</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span>Підбір під ваш бюджет і щомісячний платіж</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🚗</span>
                <span>Широкий вибір автомобілів різних марок та моделей</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔧</span>
                <span>Повна підтримка та консультації на всіх етапах</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Контакти</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Telegram:</strong>{" "}
                <a href="https://t.me/+HsMlSniKGi5iZjli" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
                  @normalno.in.ua
                </a>
              </p>
              <p>
                <strong>Сайт:</strong> normalno-auto.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
