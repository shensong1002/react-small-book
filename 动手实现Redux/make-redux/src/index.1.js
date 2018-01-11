const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red'
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}

function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.querySelector('.title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.querySelector('.content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

function dispatch(action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

// 首次渲染页面
renderApp(appState)

// dispatch更新数据
dispatch({type: 'UPDATE_TITLE_TEXT', text: 'Vue.js 小书内容'})
dispatch({type: 'UPDATE_TITLE_COLOR', color: 'yellow'})

// 重新渲染
renderApp(appState)
