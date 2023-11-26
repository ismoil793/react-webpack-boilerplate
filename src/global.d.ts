// helps to import scss files as modules and use class names
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames
}
