## 暴露配置文件
```
    npm run eject
```

## CSS Modules
```
    modules: true,
    localIdentName: '[name]__[local]--[hash:base64:5]'
```

## Less
[链接](https://segmentfault.com/a/1190000010162614)
[链接](https://www.cnblogs.com/hezihao/p/8028193.html)
```
    // 需要安装less和less-loader
    // 第一处修改
    test: /\.(css|less)$/
    // 第二处修改
    {
        loader: require.resolve('less-loader')
    }
```

## build打包
```
    需要在webpack.config.prod配置less，否则无法转成css
```
[链接](https://www.jianshu.com/p/c51bbd6c5532)
