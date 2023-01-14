module.exports = {
    plugins: [
        {
            postcssPlugin: "inaccurate-pseudo-where",
            Rule(rule) {
                rule.selector = rule.selector?.replace(/:where\((\.astro-\w+)\)/g, "$1");
            },
        },
    ]
}