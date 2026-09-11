---
title: "Quantaureum அளவாக்கம்"
description: "Quantaureum இணை இயக்கம், பரிதியிடுதல், நிரூபணவு-முதல் தரவு எதிர்பார்த்தல்தன்மை மற்றும் உள்ளமைக்கப்பட்ட ரோல்அப் காடரம் மூலம் அளவாக்கப்படுகிறது — மையமற்ற தன்மையைப் பலிப்படுத்தாமல்."
lang: ta
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum என்பது பல்வேறு அடுக்குகளில் ஒரே நேரத்தில் வளர்வதற்காக வடிவமைக்கப்பட்டுள்ளது: அடிப்படை அடுக்கு (base layer) பரிமாற்றங்களை இணை இயக்கத்தில் நிகழ்த்துகிறது, தரவு எச்சரிக்கை (data availability) முழுமையான பதிவிறக்கம் மாறாக அடர்த்தியான மதனியல் நிரூபணங்களைப் பயன்படுத்தி சரிபார்க்கப்படுகிறது, மேலும் rollups-களுக்கு நெறிமுறையின் உள்ளே முதல்தர ஆதரவு (first-class support) கட்டமைக்கப்பட்டுள்ளது.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum-இல் சக்திப்படுத்தல்
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM பாணி <strong>இணை இயக்கம் (parallel execution)</strong> மல்டிகோர் ஹார்ட்வீரை திறனாகப் பயன்படுத்துகிறது</li>
    <li><strong>சார்ட்டிங் (Sharding)</strong> நிலையைக் கமிட்டிகளில் பிரிக்கிறது; சார்ட்-க்கு-சார்ட் செய்திமடல்கள் (cross-shard messaging) மூலம் ஒன்றோடொன்று தொடர்பு கொள்ளும்</li>
    <li><strong>Erasure coding + FRI</strong> தரவு எச்சரிக்கை சோதனைகளை மலிவாகவும் குவாண்டம்-சுரக்கமாகவும் (quantum-safe) வைத்திருக்கிறது</li>
    <li style={{ marginBottom: 0 }}><strong>அசல் rollups (Native rollups)</strong> நெறிமுறையிலிருந்து குரங்கு (sequencing) மற்றும் மோசடி நிரூபணங்களைப் (fraud proofs) பெறுகின்றன</li>
  </ul>
</AlertContent>
</Alert>

## இணை இயக்கம் {#parallel-execution}

QVM பரிமாற்றங்களை Block-STM பாணி இணை இயக்க என்ஜினுடன் நிகழ்த்துகிறது. சுதந்திரமான பரிமாற்றங்கள் மல்டி-வெர்ஷன் நினைவகத்தைப் (multi-version memory) பயன்படுத்தி CPU கோர்களைப் பார்த்து ஒரே நேரத்தில் இயங்குகின்றன; முரண்பாடுகள் கண்டறியப்பட்டு மீண்டும் இயக்கப்படுவதால், இறுதி நிலை எப்போதும் உறுதியான தொடர் முறைக்கு (definitive sequential order) பொருந்தும். இணை இயக்கம் சேர்ப்பு விளைவுகளை (throughput) அதிகரிக்கிறது; எந்த contract அர்த்தங்களையும் (contract semantics) மாற்றாமல்.

[QVM பற்றி மேலும்](/developers/docs/qvm/)

## சார்ட்டிங் மற்றும் சார்ட்-க்கு-சார்ட் செய்திமடல் {#sharding}

Quantaureum பல-சார்ட் கட்டமைப்பை ஆதரிக்கிறது: நிலையும் இயக்கமும் சார்டுகளில் பிரிக்கப்படுகின்றன; சார்ட்-க்கு-சாரட் செய்திமடல் (cross-shard messaging) contract-களும் பயனர்களும் சார்டுகளுக்கு இடையே அதோறே (atomically) தொடர்பு கொள்ள அனுமதிக்கிறது. சார்ட்டிங் பொதுவான ஹார்ட்வீரில் முழு ஒப்பிடல் திறனை உயர்த்துகிறது — ஒவ்வொரு validator-க்கும் பெரிய மெஷின்களைக் கேட்காமல்.

## தரவு எச்சரிக்கை: சோதனை மலிவு {#data-availability}

எந்த நோடும் பிளாக் தரவு உண்மையாக வெளியிடப்பட்டது என்பதை உறுதிப்படுத்தக்கூடியதாக இருக்க வேண்டும். Quantaureum-இன் தரவு எச்சரிக்கை அடுக்கு **erasure coding**-ஐ (பிளாக் ஒரு பகுதி தடுத்து வைக்கப்பட்டாலும் உயிர்வாழ்கிறது) மற்றும் **FRI commitments**-ஐ (hash அடிப்படையிலான புலியினோமியல் commitments, குவாண்டம்-சுரக்கமானது) மற்றும் **தரவு எச்சரிக்கை மாதிரிப்பிடிப்பு (DAS)**-ஐ பயன்படுத்துகிறது — இதன் மூலம் light clients முழுமையான பிளாக்களைப் பதிவிறக்காமல் சிறிய துண்டுகளை மாதிரிப்படுத்துவதன் மூலம் எச்சரிக்கையைச் சோதிக்க முடியும்.

[தரவு எச்சரிக்கை பற்றி மேலும்](/developers/docs/data-availability/)

## அசல் rollups {#native-rollups}

[Rollups](/layer-2/) offchain பரிமாற்றங்களைத் தொகுத்து விளைவுகளை அடிப்படை அடுக்கில் பதிவு செய்கின்றன. Quantaureum-இல் rollups கட்டமைப்பு **நெறிமுறையின் உள்ளே கட்டமைக்கப்பட்டுள்ளது**: ஒரு sequencing path, QASM வரிசைகளாக உருவாக்கப்பட்ட L1↔L2 bridge, மற்றும் onchain fraud proofs. Rollups developers Quantaureum அடிப்படை அடுக்கின் பாதுகாப்பை — அதன் post-quantum signatures மற்றும் threshold finality உள்ளடங்கியது — இன்னும் தங்களுக்காகவே sequencing மற்றும் bridging கட்டமைப்பைத் தலை முதலே உருவாக்காமல் பெறுகிறார்கள்.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Rollups பற்றி மேலும்</ButtonLink>

## தற்போதைய முன்னேற்றம் {#current-progress}

இணை இயக்கம், erasure-coding/FRI தரவு எச்சரிக்கை அடுக்கு, Verkle proofs மூலம் light-client சரிபார்ப்பு, மற்றும் fraud proofs உடைய அசல் rollups கட்டமைப்பு — இவை அனைத்தும் Quantaureum codebase-இன் இயங்கும் பகுதிகள். தொடர் கருவி சார்ட்டிங்கை விரிவுபடுத்துதல், witness aggregation-ஐ மேம்படுத்துதல், மற்றும் rollups settlement-க்கு gas விலைகளைக் குறைப்பில் கவனம் செலுத்துகிறது.

<QuizWidget quizKey="scaling" />
