<?xml version="1.0" ?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="text" indent="no"/><xsl:template match="/data"><![CDATA[<div data-wrapper="true" style="font-size:9pt;font-family:'Segoe UI','Helvetica Neue',sans-serif;">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div style="font-size:9pt; font-family:'Segoe UI','Helvetica Neue',sans-serif">
<div>Greetings,<br>
Please see the below resolution:</div>

<div>&nbsp;</div>

<div><strong>Brief Statement of Issue and Status:</strong> ]]><xsl:choose><xsl:when test="mcs_tracker/mcs_briefstatementofissueandstatus"><xsl:value-of select="mcs_tracker/mcs_briefstatementofissueandstatus" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[</div>

<div>&nbsp;</div>

<div><strong>Actions, Progress, and Resolution: </strong>]]><xsl:choose><xsl:when test="mcs_tracker/mcs_actionsprogressandresolution"><xsl:value-of select="mcs_tracker/mcs_actionsprogressandresolution" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[</div>

<div>&nbsp;</div>

<div><strong>Next Steps:</strong> ]]><xsl:choose><xsl:when test="mcs_tracker/mcs_nextsteps"><xsl:value-of select="mcs_tracker/mcs_nextsteps" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[</div>

<div>&nbsp;</div>

<div><strong>For further information contact: </strong>]]><xsl:choose><xsl:when test="mcs_tracker/mcs_forfurtherinformationcontact"><xsl:value-of select="mcs_tracker/mcs_forfurtherinformationcontact" /></xsl:when><xsl:otherwise></xsl:otherwise></xsl:choose><![CDATA[</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>]]></xsl:template></xsl:stylesheet>