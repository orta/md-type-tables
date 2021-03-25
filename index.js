const ts = require('typescript')

module.exports = {
  transforms: {
    /* Match <!-- AUTO-GENERATED-CONTENT:START (TYPES:src=filepath&symbol=Type) --> */
    TYPES (_content, options) {
      const mds = []
      let program = ts.createProgram([options.src], {})
      const sourceFile = program.getSourceFile(options.src)

      /** @type {import("typescript").TypeAliasDeclaration} */
      let typeNode = undefined
      const findSymbol = (node) => {
        if (node && node.name && node.name.escapedText && node.name.escapedText === options.symbol) {
          typeNode = node
        }
        if (!typeNode) ts.forEachChild(node, findSymbol);
      }

      findSymbol(sourceFile)
      if (!typeNode) throw new Error(`Could not find ${options.symbol} in ${options.src}`)
      
      mds.push(prefix)
      typeNode.type.members.forEach(member => {
        const name = member.name.escapedText
        const type =  sourceFile.text.slice(member.type.pos + 1, member.type.end)

        const required = member.jsDoc && !!member.jsDoc.find(d => d.tags && d.tags.find(t => t.tagName.escapedText))
        const info = member.jsDoc && member.jsDoc.map(jd => jd.comment).join("\n\n")

        mds.push(`<tr>
  <th>
    <code>${name}</code>
  </th>
  <th>
    <code>${type}</code>
  </th>
  <td>

${required ? "**Required**" : ""}
${info}

  </td>
</tr>`)
      })

      mds.push(suffix)
      return mds.join('\n\n')
    },
  }
}


const prefix = `<table width="100%">
<thead align=left>
  <tr>
    <th width=150>
      name
    </th>
    <th width=70>
      type
    </th>
    <th>
      description
    </th>
  </tr>
</thead>
<tbody align=left valign=top>`

   const suffix = `
   </tbody>
 </table>
`
    