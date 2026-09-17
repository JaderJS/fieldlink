// extensions/ProductSection.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const ProductSection = Node.create({
    name: 'productSection',

    group: 'block',

    atom: true, // impede edição direta dentro

    addAttributes() {
        return {
            html: {
                default: '',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'product-section',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['product-section', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement('div')
            dom.classList.add('rounded', 'bg-gray-100', 'p-2', 'border', 'text-sm')
            dom.innerHTML = node.attrs.html || '<p>Nenhum produto selecionado.</p>'
            dom.contentEditable = 'false'
            return {
                dom,
            }
        }
    },
})
