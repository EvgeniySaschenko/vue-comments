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

- От бекенда нам необходимо получить 2 объекта `items` и `mapItems`:
#### items - список комментаририев
| Parameter | Type | Value | Description |
| --- | :---: | :---: | --- |
| answerQuantity | Number | 0 | Количество ответов на комментарий (удалить?) |
| dateCreate | Number | timestamp | дата создания |
| dislike | Number | <= 0 | количество дизлайков |
| like | Number | <= 0 | количество лайков |
| voteValue | Number | 0 - не голосовал, <br> 1 - like, <br> -1 - dislike | пользователь поставил лайк, дизлайк или  не голосовал |
| files | Array | [] - нет файлов,<br> ["ссылка на файл 1", "ссылка на файл 2"] - есть файлы | список файлов |


- dateCreate - 
- dateUpdate - дата редактирования
- dislike - количество дизлайков
- like - лайков
- voteValue - если пользователь 

- files: список файлов
- id: уникальный индификатор комментирия
- isManageDelete - указывает на то что данный пользователь имеет право удалить комментирий
- isManageEdit - указывает на то что данный пользователь имеет право редактировать комментирий
- parentId - индификатор предка (id комментария на который ответили)
- text - текст комментария
- userId - id автора комментария
- userImg - изображение автора комментария
- userName - имя пользователя


**mapItems - описывает иерархию дерева (вложенность и последовательность) и количество комменрариев

```json
{

}
```

## Опции

| Parameter | Type | Default | Description |
| --- | :---: | :---: | --- |
| Parameter | Type | Default | Description |

