# Uppgift 1

## XML DOM

XML DOM är ett API för XML-dokument som baseras på den hierarkiska trädstrukturen ett XML-dokument har och tillåter att man kan söka, manipulera, lägga till och ta bort data i ett XML-dokument.

## XPath

XPath står för XML Path Language och används främst för XSLT. XPath kan användas för att navigera och hitta bland elementen i ett XML-dokument. Det finns även funktioner i XPath som t ex kan användas för att räkna ett visst antal element, räkna på värden i olika element eller begränsa antal element.

## Attribut i XML

Ett attribut är ett fält i ett XML-dokument och ligger innanför ett elements start-tagg. Ett attribut består av ett namn och ett värde. Attributen skrivs alltid som en textsträng, men med XSD-schema kan man definera vilken datatyp ett visst attribut ska ha, så som nummer, datum eller textsträng.

## PCDATA

PCDATA står för Parsed Character Data och är teckendata som måste tolkas i ett XML-dokument. Ett elements innehåll består av PCDATA och då detta måste tolkas så finns det en del tecken som inte är tillåtna. T ex tecknen < och > som ju indikerar en start och slut på en XML-tagg. Dessa måste därför skrivas som en fördefinerad entitet. Tecknet < skrivs som &lt; och tecknet > skrivs som &gt;.

## XSLT

XSLT står för Extensible Stylesheet Language och definerar stilmallar för ett XML-dokument. XSLT tranformerar ett XML-dokument till ett annat dokument. Vanligaste transformationen är till HTML men kan också användas för t ex PDF. XSLT använder sig av XPath för transformationer.

## XML namespace

Om data kombineras från flera olika källor till ett enda XML-dokument kan det resultera i namnkonflikter för element och attribut. Lösningen på detta är att använda sig av XML namespace som skiljer mellan olika typer av element med samma namn genom att tilldela dessa element separata namespaces. Man deklarerar namespace som regel i root-elementet, men kan även göras i andra elements starttagg.

## Root

Root är det första elementet i ett XML-dokument där alla andra element kapslas in. Alla XML-dokument har endast en root.

## URI

URI står för Uniform Resource Identifier och används för att identifiera eller namnge en resurs. I XML används URI för att definera XML namespace-namn eftersom en URI är garanterat unik.

# Simpel datatyp

```xml
<xsd:simpleType name="diceRoll">
    <xsd:restriction base="xsd:integer">
        <xsd:minInclusive value="1"/>
        <xsd:maxInclusive value="6"/>
    </xsd:restriction>
</xsd:simpleType>
```

# XML Grunder

XML blev populärt på grund av sin utbyggbarhet vilket har gjort att många andra märkspråk (eng. markup language) baseras på det (t ex HTML). XML kan användas för att att beskriva webbsidor (XHTML eller med XSD och XPath) och för att utväxla information mellan olika system. För att använda XML-dokument mellan system så krävs att både sändare och mottagare har kommit överens om vilka element och attribut som ska kunna användas. Detta kan göras genom att använda XML-scheman.

# Namespace

```xml
<?xml version="1.0" encoding="UTF-8"?>
<produkter
    xmlns:dator="http://www.example.com/dator"
    xmlns:mobil="http://www.example.com/mobil">
    <dator:produkt>
        <dator:namn>Macbook Pro</dator:namn>
        <dator:minne>64 GB</dator:minne>
        <dator:pris>25000</dator:pris>
    </dator:produkt>
    <mobil:produkt>
        <mobil:namn>IPhone</mobil:namn>
        <mobil:minne>32 GB</mobil:minne>
        <mobil:sim>micro</mobil:sim>
        <mobil:pris>15000</mobil:pris>
    </mobil:produkt>
</produkter>
```

# DTD (5)

Se uppgift5.xml. Jag validerade mot https://www.truugo.com/xml_validator

# DTD (6)

Se uppgift6.xml. Jag validerade mot https://www.truugo.com/xml_validator

# Schema

Se uppgift7a.xsd och uppgift7b.xsd. Jag validerade mot https://www.freeformatter.com/xml-validator-xsd.html

# XSLT (8)

Se uppgift8.xsl.

# XSLT (9)

Se uppgift9.xsl
