# vue-comments

> Компонент древовидных комментариев для Vue.js 3  **[Demo](https://vue-comments.herokuapp.com/)** (Alpha)

## Возможности
- Добавление / редактирование / удаление комментариев 
- Добавление файлов, если файлов больше одного - просмотр в виде галлереи
- Смайлики
- Преобразование http / https в гиперссылку
- Подгрузка комментариев
- Возможность ограничить отобржение текста по количеству сторк / символов
- Лайки / дизлайки
- Адаптация под мобильные устройства

## Для просмотра локально надо:

##### 1. Скачать данный репозиторий (Front-End) и выполнить следующие команды:

#### Установка

```
npm install
```

#### Запуск в режиме разработки
```
npm run dev
```

##### 2. Скачать репозиторий [Back-End](https://github.com/EvgeniySaschenko/comments-api-server) и выполнить команды из описания:

## Example Back-End

- От бекенда нам необходимо получить 2 объекта `items` и `mapItems` - где ключами являются id комментариев:

#### items - список комментаририев
```
  {
    1549 : {
      dateCreate: 1632329876,
      dateUpdate: 1632329889,
      dislike: 0,
      like: 0,
      voteValue: 0
      files: [],
      id: 1549,
      isManageDelete: false,
      isManageEdit: false,
      parentId: 0,
      text: "text 😇😇😇😇",
      userImg: "",
      userName: "Jhon",
    },
    1550 : {
      dateCreate: 1632329876,
      dateUpdate: 1632329889,
      dislike: 2,
      like: 0,
      voteValue: -1,
      files: ["http://localhost:8888/images/comments/1581_0.jpg"],
      id: 1550,
      isManageDelete: false,
      isManageEdit: false,
      parentId: 1549,
      text: "text text",
      userImg: "",
      userName: "Ivan",
    }
  }
```


| Parameter | Type | Value | Description |
| --- | :---: | :---: | --- |
| dateCreate | `Number` | timestamp | дата создания |
| dateUpdate | `Number` | 0 / timestamp | дата редактирования |
| dislike | `Number` | <= 0 | количество дизлайков |
| like | `Number` | <= 0 | количество лайков |
| voteValue | `Number` | 0 - не голосовал, <br> 1 - like, <br> -1 - dislike | пользователь поставил лайк, дизлайк или  не голосовал |
| files | `Array` | [] - нет файлов,<br> ["ссылка на файл 1", "ссылка на файл 2"] - есть файлы | список файлов |
| id | `Number` / `String` | Number / String |  уникальный индификатор комментирия |
| isManageDelete | `Boolean` | true / false | указывает на то что данный пользователь имеет право удалить комментирий |
| isManageEdit | `Boolean` | true / false | указывает на то что данный пользователь имеет право редактировать комментирий |
| parentId | `Number` / `String` | Number / String | индификатор предка (id комментария на который ответили) |
| text | `String` | String | текст комментария |
| userImg | `String` | String | изображение автора комментария |
| userName | `String` | String | имя автора комментария |

#### mapItems - описывает иерархию дерева (вложенность и последовательность) и количество комменрариев

**mapItems - описывает иерархию дерева (вложенность и последовательность) и количество комменрариев

```json
{

}
```

## Опции

| Parameter | Type | Default | Description |
| --- | :---: | :---: | --- |
| Parameter | Type | Default | Description |

