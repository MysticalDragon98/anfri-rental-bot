const { yellow, bold } = require('chalk');

const Styles = {
    address: (str: any) => yellow(str.toString()),
    title: (str: any) => bold(str.toString()),
}

export default Styles;