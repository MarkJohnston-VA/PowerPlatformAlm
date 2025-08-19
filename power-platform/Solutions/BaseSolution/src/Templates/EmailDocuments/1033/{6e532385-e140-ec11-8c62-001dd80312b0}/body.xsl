<?xml version="1.0" ?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="text" indent="no"/><xsl:template match="/data"><![CDATA[<div data-wrapper="true" style="font-size:9pt;font-family:'Segoe UI','Helvetica Neue',sans-serif;">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div>Greetings,</div>

<div><br>
Please see the below resolution:</div>

<div><br>
Resolution Description:&nbsp;</div>

<div>&nbsp;</div>

<div>]]><xsl:choose><xsl:when test="mcs_tracker/mcs_response"><xsl:value-of select="mcs_tracker/mcs_response" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[</div>

<div>&nbsp;</div>
</div>
</div>
</div>
</div>
</div>]]></xsl:template></xsl:stylesheet>