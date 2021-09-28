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


## Options
| Parameter | Type | Default | Description |
| --- | :---: | :---: | --- |
| filesMaxCount | `Number` | Infinity | Maximum number of files to upload (нужно реализовать) |
| validExtensions | `Array` | ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"] | Allowed file extensions |
| **parentIdStart** | `Number` / `String` | 0 | The identifier of the first ancestor |
| emojiLilst | `Array` / `String` | ["😀","😃","😄","😁","😆","😅","😂","🤣","😇","😉","😊","🙂","🙃","😋","😌","😍","🥰","😘","😗","😙","😚","🤪","😜","😝","😛","🤑","😎"] | List emoji |
| isScrollToComment | `Boolean` | true | Scroll to added comment |
| text.minLength | `Number` | 0 | Minimum text length (не реализовано) |
| text.maxLength | `Number` | 0 | Maximum text length (не реализовано) |
| text.briefMaxLength | `Number` | 150 | Maximum length of preview text (after which the "More" button is added) |
| text.briefMaxLine | `Number` / `String` | 4 | Maximum number of lines of preview text (after which the "More" button is added).The values "none" and "number greater than 0" |
| list.mainShowStart | `Number` | 5 | **On first boot** The number of comments in the main list before "Show more" |
| list.secondShowStart | `Number` | 1 | **On first boot** The number of comments in the nested list before "Show more" appears |
| list.mainShow | `Number` | 5 | **Сlick "Show more"** The number of comments that are displayed in the main list when you click on the button "Show more" |
| list.secondShow | `Number` | 3 | **Сlick "Show more"** The number of comments that are displayed in the second list when you click on the button "Show more" |
| translation.btnAnswer | `String` | Answer | Answer button |
| translation.btnЕxpand | `String` | More | Expand text button |
| translation.btnCollapse | `String` | Collapse | Collapse button |
| translation.btnFileDownload | `String` | Download | File download button |
| translation.fileDelete | `String` | Delete | File delete button |
| translation.fileRestore | `String` | Restore | File restore button |
| translation.dateToday | `String` | Today | Text of today's date "Today" |
| translation.dateYesterday | `String` | Yesterday | Yesterday's date text "Yesterday" |
| translation.dateEditedText | `String` | Edited | Text before editing date |
| translation.settingsDelete | `String` | Delete | Delete setting text |
| translation.settingsEdit | `String` | Edit | Edit setting text |
| translation.btnMore | `String` | Show more | Button "Show more" comments |
| translation.btnMoreAnswers | `String` | Show answers | Button "Show answers" comments |
| translation.formPlaceholder | `String` | Add a comment | Placeholder form |
| translation.btnСancelEditing | `String` | Сancel editing | Answer button |
| translation.formAnswerTo | `String` | Answer to | Phrase in the form when replying to a comment |
| translation.messageFileParams | `String` | Maximum file size 2 Mb, supported extentions 'jpg', 'png', 'jpeg', 'jpeg', 'vue' | Information about the maximum file size and supported extensions |
| translation.errorFormSend | `String` | Error sending form |  |
| translation.errorVoteSend | `String` | Error sending vote |  |
| translation.errorUnexpected | `String` | Unexpected error |  |
| translation.errorGetComments | `String` | Error get comments |  |
| translation.errorFileExtension | `String` | Error file extension |  |
| translation.errorFileSize | `String` | Error file size |  |