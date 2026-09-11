---
title: "Quantaureum: مزید محفوظ"
description: "Quantaureum کی حفاظت ڈیزائن کے لحاظ سے پوسٹ کوانٹم کروپٹوگرافی، تھریشولڈ سگنیچر فائنالیٹی، اور ایک ایسے validator سیٹ سے آتی ہے جو پہلے سے ہی مستحکم ہے۔"
lang: ur
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - پوسٹ کوانٹم کروپٹوگرافی (Dilithium3, Kyber768) فعال ہے، کوئی مستقبل کی منتقلی نہیں
  - بلاکس validator کمیٹی کے GM-QTD تھریشولڈ سگنیچرز کے ذریعے فائنالیٹی تک پہنچتے ہیں
  - پروٹوکول مرحلہ وار ریلیز شدہ اپگریڈز پر زور دینے کے بجائے سادہ، جانچِپذیر کنسنسس کو ترجیح دیتا ہے
---
Quantaureum کو quantum-safe [اسمارٹ کنٹراکٹ](/glossary/#smart-contract) پلیٹ فارم کے طور پر تیار کیا گیا ہے۔ سیکیورٹی کا کام پروٹوکول کے اندر ہی ہوتا ہے — سگنیچر اسکیمز، فائنالیٹی گیڈجز، اور valiڈیٹر ریزیلیئنس — نہ کہ فورک ڈیڈ لائن اپ گریڈز کی لمبی قطار کے ذریعے۔

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

جی ہاں۔ تمام اکاؤنٹس اور valiڈیٹر سگنیچرز Dilithium3 کا استعمال کرتے ہیں، جو NIST-معیاری post-quantum سگنیچر اسکیم ہے، اور بلاک valiڈیٹر کمیٹی کے threshold سگنیچرز کے ذریعے finaliz ہوتے ہیں۔ کوئی pending cryptographic migration موجود نہیں جو بعد میں صارفین کو پھنسائے۔

</ExpandableCard>

## threshold فائنالیٹی {#threshold-finality}

صارف کی سیکیورٹی [فائنالیٹی](/glossary/#finality) پر منحصر ہے: وہ لمحہ جب ٹرانزیکشن مستقل اور غیرِ قابلِ واپسی ہو جائے۔ Quantaureum پر، بلاک valiڈیٹر کمیٹی کے ذریعے **GM-QTD** کے ساتھ finaliz ہوتے ہیں — distributed key generation اور threshold signing کی مجموعی شکل۔ چونکہ فائنالیٹی پروٹوکول کے اندر سنتھائز کردہ کمیٹی سگنیچر ہے، quorum کے مستقل valiڈیٹرز زنجیر کو finaliz کرنے کے لیے کفایت پائے، اور پروٹوکول slashing کے ذریعے محدود تناسب میں خراب یا بدعتمد valiڈیٹرز کی گنجائش رکھتا ہے۔

## ریزیلیئنٹ valiڈیٹرز {#resilient-validators}

کوئی valiڈیٹر واحد ناکامی کے نقطے کی عادت نہ بنے۔ Quantaureum کے threshold سگنیچر ڈیزائن کے تحت valiڈیٹر ذمہ داریاں ساخت کے لحاظ سے پہلے سے تقسیم ہیں: فائنالیٹی سگنیچر کے لیے کمیٹی کے threshold رکنوں کی شرکت ضروری ہے، نہ کہ ایک مشین کا ایک hot key رکھنا۔ slashing شرطوں اور stake-weighted انتخاب کے ساتھ مل کر، یہ نیٹ ورک کو لائیو رکھتا ہے جب بعض valiڈیٹرز آف لائن ہو جائیں۔

<ButtonLink variant="outline" href="/staking/">اسٹیکنگ پر مزید</ButtonLink>

## کوانٹم مزاحمت {#quantum-resistance}

زیادہ تر متعارف blockchains elliptic-curve cryptography پر انحصار کرتے ہیں جسے کافی بڑا quantum کمپیوٹر توڑ سکتا ہے — جس کے سبب انہیں دردناک، مرحلہ وار migrations میں جانا پڑتا ہے۔ **Quantaureum کو یہ مسئلہ نہیں ہے**: Dilithium3 سگنیچرز، Kyber768 key exchange، hash-based (FRI) data-availability commitments، اور quantum randomness — سبھی live پروٹوکول فیچرز ہیں۔

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">کوانٹم مزاحمت پر مزید</ButtonLink>

## جاری کام {#ongoing-work}

فعال سیکیورٹی کاموں میں threshold سگنیچر پروٹوکول کو مزید مضبوط کرنا، [data availability](/developers/docs/data-availability/) لیئر کے FRI commitments کو پھیلانا، اور QVM کے parallel-execution semantics کو formalize کرنا شامل ہے تاکہ parallel engine ثابت شدہ طور پر sequential execution سے مماثل ثابت ہو۔
