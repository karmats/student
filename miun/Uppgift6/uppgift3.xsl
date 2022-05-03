<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Fordonsannonser</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Modell</th>
                            <th>Pris</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="//ad">
                            <xsl:sort select="type" order="descending" />
                            <xsl:sort select="name" order="ascending" />
                            <xsl:sort select="model" order="ascending" />
                            <tr>
                                <td>
                                    <xsl:value-of select="name" />
                                </td>
                                <td>
                                    <xsl:value-of select="model" />
                                </td>
                                <td>
                                    <xsl:value-of select="price" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>