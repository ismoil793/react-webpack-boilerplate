import { PluginItem } from "@babel/core";

export function removeDataTestIsmoilBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forBiddenProps = state.opts.props || []

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;
                        if (forBiddenProps.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    }
                })
            }
        }
    }
}