<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Plantdata</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Zon</th>
                            <th>Lägsta pris</th>
                            <th>Högsta pris</th>
                            <th>Medelpris</th>
                            <th>Total pris</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>
                                <xsl:for-each select="(//PLANT[ZONE=3]/PRICE)">
                                    <xsl:sort data-type="number" order="ascending" />
                                    <xsl:if test="position()=1">
                                        <xsl:value-of select="." />
                                    </xsl:if>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:for-each select="(//PLANT[ZONE=3]/PRICE)">
                                    <xsl:sort data-type="number" order="descending" />
                                    <xsl:if test="position()=1">
                                        <xsl:value-of select="." />
                                    </xsl:if>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:value-of select="round(sum(//PLANT[ZONE=3]/PRICE) div count(//PLANT[ZONE=3]/PRICE))" />
                            </td>
                            <td>
                                <xsl:value-of select="sum(//PLANT[ZONE=3]/PRICE)" />
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                <xsl:for-each select="(//PLANT[ZONE=4]/PRICE)">
                                    <xsl:sort data-type="number" order="ascending" />
                                    <xsl:if test="position()=1">
                                        <xsl:value-of select="." />
                                    </xsl:if>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:for-each select="(//PLANT[ZONE=4]/PRICE)">
                                    <xsl:sort data-type="number" order="descending" />
                                    <xsl:if test="position()=1">
                                        <xsl:value-of select="." />
                                    </xsl:if>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:value-of select="round(sum(//PLANT[ZONE=4]/PRICE) div count(//PLANT[ZONE=4]/PRICE))" />
                            </td>
                            <td>
                                <xsl:value-of select="sum(//PLANT[ZONE=4]/PRICE)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>