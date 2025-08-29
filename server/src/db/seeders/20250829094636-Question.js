'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        // Горы (themeId: 1)
        {
          questionText:
            "Какая гора считается самой 'ленивой' среди альпинистов?",
          correctAnswer: 'Эверест (потому что на неё все хотят взобраться)',
          points: 100,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему гора Фудзияма никогда не простужается?',
          correctAnswer: 'У неё всегда есть снежная шапка',
          points: 200,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какая гора самая музыкальная?',
          correctAnswer: "Эльбрус (звучит как 'альт-брас')",
          points: 300,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему альпинисты никогда не берут в горы будильник?',
          correctAnswer: 'Потому что горы сами будят на рассвете',
          points: 400,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какая гора лучше всех играет в прятки?',
          correctAnswer: 'Любая в тумане',
          points: 500,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему горы никогда не опаздывают на встречи?',
          correctAnswer: 'Они всегда на месте уже миллионы лет',
          points: 600,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Еноты (themeId: 2)
        {
          questionText: 'Почему еноты всегда моют еду перед едой?',
          correctAnswer: 'Они помешаны на чистоте (и у них лапки-мочалки)',
          points: 100,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какая профессия лучше всего подходит еноту?',
          correctAnswer: 'Посудомойщик или грабитель (маска уже есть)',
          points: 200,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему еноты отличные программисты?',
          correctAnswer:
            'Они мастера отладки (debugging) - всё перебирают лапками',
          points: 300,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Что общего у енота и хакера?',
          correctAnswer: 'Оба работают ночью в маске и роются в чужих данных',
          points: 400,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText:
            'Почему еноты никогда не становятся поварами в ресторанах?',
          correctAnswer: 'Слишком долго моют каждый ингредиент',
          points: 500,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какой социальной сетью пользуются еноты?',
          correctAnswer: 'Trash-agram (мусор + Instagram)',
          points: 600,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Страны (themeId: 3)
        {
          questionText: 'Какая страна самая вежливая?',
          correctAnswer: 'Канада (извиняются даже за хорошую погоду)',
          points: 100,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'В какой стране лучше всего изучать геометрию?',
          correctAnswer: 'В Египте (пирамиды - лучшие учебные пособия)',
          points: 200,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему в Швейцарии самые точные часы?',
          correctAnswer: 'Потому что опоздание там считается преступлением',
          points: 300,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какая страна никогда не проигрывает в футбол дома?',
          correctAnswer: 'Бразилия (там футбол - это религия)',
          points: 400,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'В какой стране проще всего стать королём?',
          correctAnswer: 'В Таиланде (там 20 тысяч принцев)',
          points: 500,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: "Какая страна самая 'квадратная'?",
          correctAnswer: 'Ватикан (самая маленькая и почти квадратная)',
          points: 600,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // IT (themeId: 4)
        {
          questionText: 'Почему программисты предпочитают тёмную тему?',
          correctAnswer: 'Потому что light привлекает bugs',
          points: 100,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Сколько программистов нужно, чтобы поменять лампочку?',
          correctAnswer: 'Ноль. Это аппаратная проблема',
          points: 200,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему программисты путают Хэллоуин и Рождество?',
          correctAnswer: 'Потому что Oct 31 == Dec 25',
          points: 300,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какая самая страшная фраза для программиста?',
          correctAnswer: 'Работает на моей машине',
          points: 400,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Почему программисты не любят природу?',
          correctAnswer: 'Слишком много багов и нет WiFi',
          points: 500,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Что сказал рекурсивный программист перед смертью?',
          correctAnswer: 'Что сказал рекурсивный программист перед смертью?',
          points: 600,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Ошибочка вышла! (themeId: 6)
        {
          questionText: 'Какую ошибку совершали люди тысячи лет?',
          correctAnswer: 'Думали, что Земля плоская',
          points: 100,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какое заблуждение было у врачей до 19 века?',
          correctAnswer: 'Что мытьё рук перед операцией не нужно',
          points: 200,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какую ошибку совершила компания Kodak?',
          correctAnswer: 'Проигнорировала цифровую фотографию',
          points: 300,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какое заблуждение было у учёных о мозге?',
          correctAnswer: 'Что мы используем только 10% мозга',
          points: 400,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какую ошибку допустила IBM в 1943 году?',
          correctAnswer: 'Сказала, что миру нужно всего 5 компьютеров',
          points: 500,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionText: 'Какое научное заблуждение существовало до Коперника?',
          correctAnswer: 'Что Солнце вращается вокруг Земли',
          points: 600,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
