'use strict';
const LANGUAGES = [
  ['en', 'English'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'],
  ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch'], ['pt', 'Português'],
  ['ja', '日本語'], ['ko', '한국어'], ['ar', 'العربية']
];
const TRANSLATIONS = {
  en: {
    language:'Language', home:'Name the Flag home', title:'Flag cheatsheet', eyebrow:'THE WORLD, AT A GLANCE', intro:'Hide the familiar. Learn the unfamiliar.', total:'flags · one world', options:'Display options', sort:'Sort by', color:'Color', alpha:'Name A–Z', major:'Hide major countries', list:'View list', jump:'Jump to a group', restore:'Restore all', shown:'Showing {count} of {total} flags', colorOrder:'Grouped by dominant color', alphaOrder:'Sorted by name in English', names:'Country names', empty:'All flags are hidden. Select “Restore all” to start again.', dialogTitle:'Major-country preset', dialogCopy:'A preset of 16 familiar countries for practice, not an official classification. The switch hides these flags together. You can also hide any flag using the × button on its card.', close:'Close', done:'Got it', undo:'Undo', hide:'Hide {name}', hidden:'Hidden: {name}', flag:'Flag of {name}', palette:'Main flag colors', source:'Flag images from', footer:'Names follow your selected language', method:'Colors are estimated by image area. Ties within 2.5 percentage points follow red, orange, yellow, green, blue, purple, black, white. Includes 193 UN member states and 2 observer states.', colors:['Red','Orange','Yellow','Green','Blue','Purple','Black','White'], description:'A mobile-friendly flag reference with translated country names, color and name sorting, and country hiding.'
  },
  'zh-CN': {
    language:'语言', home:'Name the Flag 首页', title:'国旗速查', eyebrow:'一眼认出世界', intro:'把熟悉的藏起来，把陌生的记下来。', total:'面国旗 · 一个世界', options:'显示选项', sort:'排列方式', color:'按颜色', alpha:'按名称（拼音）', major:'隐藏主要国家', list:'查看名单', jump:'快速跳转', restore:'恢复全部', shown:'显示 {count} / {total} 面国旗', colorOrder:'按主要色系分组', alphaOrder:'按中文国名拼音顺序排列', names:'国家名称', empty:'所有国旗都已隐藏，点击“恢复全部”重新开始。', dialogTitle:'主要国家名单', dialogCopy:'这是一组包含 16 个常见国家的练习预设，不代表官方分类。开启开关后，下列国旗会一起隐藏；也可点击卡片上的 × 单独隐藏任意国旗。', close:'关闭', done:'知道了', undo:'撤销', hide:'隐藏 {name}', hidden:'已隐藏 {name}', flag:'{name}国旗', palette:'国旗中的主要颜色', source:'国旗图像来自', footer:'国名随所选语言切换', method:'颜色按国旗图像中的色系面积估算；占比相差不超过 2.5 个百分点时，依红、橙、黄、绿、蓝、紫、黑、白顺序归组。收录 193 个联合国会员国及 2 个观察员国。', colors:['红色','橙色','黄色','绿色','蓝色','紫色','黑色','白色'], description:'适配手机的多语言国旗速查表，支持颜色、名称排序和隐藏国家。'
  },
  'zh-TW': {
    language:'語言', home:'Name the Flag 首頁', title:'國旗速查', eyebrow:'一眼認出世界', intro:'把熟悉的藏起來，把陌生的記下來。', total:'面國旗 · 一個世界', options:'顯示選項', sort:'排列方式', color:'按顏色', alpha:'按名稱（拼音）', major:'隱藏主要國家', list:'查看名單', jump:'快速跳轉', restore:'恢復全部', shown:'顯示 {count} / {total} 面國旗', colorOrder:'按主要色系分組', alphaOrder:'按中文國名拼音順序排列', names:'國家名稱', empty:'所有國旗都已隱藏，點選「恢復全部」重新開始。', dialogTitle:'主要國家名單', dialogCopy:'這是一組包含 16 個常見國家的練習預設，不代表官方分類。開啟開關後，下列國旗會一起隱藏；也可點選卡片上的 × 單獨隱藏任何國旗。', close:'關閉', done:'知道了', undo:'復原', hide:'隱藏 {name}', hidden:'已隱藏 {name}', flag:'{name}國旗', palette:'國旗中的主要顏色', source:'國旗圖像來自', footer:'國名隨所選語言切換', method:'顏色按國旗圖像中的色系面積估算；占比相差不超過 2.5 個百分點時，依紅、橙、黃、綠、藍、紫、黑、白順序歸組。收錄 193 個聯合國會員國及 2 個觀察員國。', colors:['紅色','橙色','黃色','綠色','藍色','紫色','黑色','白色'], description:'適用於手機的多語言國旗速查表，支援顏色、名稱排序及隱藏國家。'
  },
  es: {
    language:'Idioma', home:'Inicio de Name the Flag', title:'Guía de banderas', eyebrow:'EL MUNDO, DE UN VISTAZO', intro:'Oculta las conocidas. Aprende las demás.', total:'banderas · un mundo', options:'Opciones de visualización', sort:'Ordenar por', color:'Color', alpha:'Nombre A–Z', major:'Ocultar países principales', list:'Ver lista', jump:'Ir a un grupo', restore:'Restaurar todo', shown:'Mostrando {count} de {total} banderas', colorOrder:'Por color predominante', alphaOrder:'Por nombre en español', names:'Nombres de países', empty:'Todas las banderas están ocultas. Selecciona «Restaurar todo» para empezar de nuevo.', dialogTitle:'Selección de países principales', dialogCopy:'Una selección de 16 países conocidos para practicar; no es una clasificación oficial. El interruptor oculta estas banderas juntas. También puedes ocultar cualquier bandera con el botón × de su tarjeta.', close:'Cerrar', done:'Entendido', undo:'Deshacer', hide:'Ocultar {name}', hidden:'Se ha ocultado: {name}', flag:'Bandera de {name}', palette:'Colores principales de la bandera', source:'Imágenes de banderas de', footer:'Los nombres siguen el idioma seleccionado', method:'Los colores se estiman por el área de la imagen. Las diferencias de hasta 2,5 puntos porcentuales se resuelven en este orden: rojo, naranja, amarillo, verde, azul, morado, negro y blanco. Incluye 193 Estados miembros de la ONU y 2 Estados observadores.', colors:['Rojo','Naranja','Amarillo','Verde','Azul','Morado','Negro','Blanco'], description:'Guía de banderas para móviles con nombres traducidos, orden por color o nombre y opción de ocultar países.'
  },
  fr: {
    language:'Langue', home:'Accueil de Name the Flag', title:'Mémo des drapeaux', eyebrow:'LE MONDE EN UN COUP D’ŒIL', intro:'Masquez les plus connus. Découvrez les autres.', total:'drapeaux · un monde', options:'Options d’affichage', sort:'Trier par', color:'Couleur', alpha:'Nom A–Z', major:'Masquer les principaux pays', list:'Voir la liste', jump:'Aller à un groupe', restore:'Tout réafficher', shown:'{count} drapeaux affichés sur {total}', colorOrder:'Par couleur dominante', alphaOrder:'Par nom en français', names:'Noms des pays', empty:'Tous les drapeaux sont masqués. Sélectionnez « Tout réafficher » pour recommencer.', dialogTitle:'Sélection des principaux pays', dialogCopy:'Une sélection de 16 pays connus pour s’entraîner, sans valeur de classement officiel. L’interrupteur masque ces drapeaux ensemble. Vous pouvez aussi masquer chaque drapeau avec le bouton × de sa carte.', close:'Fermer', done:'Compris', undo:'Annuler', hide:'Masquer {name}', hidden:'Masqué : {name}', flag:'Drapeau : {name}', palette:'Couleurs principales du drapeau', source:'Images des drapeaux :', footer:'Les noms suivent la langue choisie', method:'Les couleurs sont estimées selon la surface de l’image. Pour un écart inférieur ou égal à 2,5 points de pourcentage, l’ordre est : rouge, orange, jaune, vert, bleu, violet, noir, blanc. Comprend 193 États membres de l’ONU et 2 États observateurs.', colors:['Rouge','Orange','Jaune','Vert','Bleu','Violet','Noir','Blanc'], description:'Un mémo des drapeaux adapté au mobile, avec noms traduits, tri par couleur ou nom et masquage des pays.'
  },
  de: {
    language:'Sprache', home:'Name the Flag Startseite', title:'Flaggenübersicht', eyebrow:'DIE WELT AUF EINEN BLICK', intro:'Bekannte ausblenden. Neue kennenlernen.', total:'Flaggen · eine Welt', options:'Anzeigeoptionen', sort:'Sortieren nach', color:'Farbe', alpha:'Name A–Z', major:'Große Länder ausblenden', list:'Liste ansehen', jump:'Zu einer Gruppe springen', restore:'Alle anzeigen', shown:'{count} von {total} Flaggen', colorOrder:'Nach vorherrschender Farbe', alphaOrder:'Nach deutschem Ländernamen', names:'Ländernamen', empty:'Alle Flaggen sind ausgeblendet. Wähle „Alle anzeigen“, um neu zu beginnen.', dialogTitle:'Länderauswahl', dialogCopy:'Eine Auswahl von 16 bekannten Ländern zum Üben, keine offizielle Einstufung. Der Schalter blendet diese Flaggen gemeinsam aus. Mit × auf einer Karte kannst du jede Flagge einzeln ausblenden.', close:'Schließen', done:'Verstanden', undo:'Rückgängig', hide:'{name} ausblenden', hidden:'Ausgeblendet: {name}', flag:'Flagge: {name}', palette:'Hauptfarben der Flagge', source:'Flaggenbilder von', footer:'Ländernamen in der gewählten Sprache', method:'Farben werden anhand der Bildfläche geschätzt. Bei Unterschieden bis 2,5 Prozentpunkten gilt die Reihenfolge Rot, Orange, Gelb, Grün, Blau, Violett, Schwarz, Weiß. Enthält 193 UN-Mitgliedstaaten und 2 Beobachterstaaten.', colors:['Rot','Orange','Gelb','Grün','Blau','Violett','Schwarz','Weiß'], description:'Mobile Flaggenübersicht mit übersetzten Ländernamen, Farb- und Namenssortierung und ausblendbaren Ländern.'
  },
  pt: {
    language:'Idioma', home:'Início de Name the Flag', title:'Guia de bandeiras', eyebrow:'O MUNDO NUM RELANCE', intro:'Oculte as conhecidas. Aprenda as restantes.', total:'bandeiras · um mundo', options:'Opções de visualização', sort:'Ordenar por', color:'Cor', alpha:'Nome A–Z', major:'Ocultar países principais', list:'Ver lista', jump:'Ir para um grupo', restore:'Mostrar todas', shown:'A mostrar {count} de {total} bandeiras', colorOrder:'Por cor predominante', alphaOrder:'Por nome em português', names:'Nomes dos países', empty:'Todas as bandeiras estão ocultas. Selecione «Mostrar todas» para recomeçar.', dialogTitle:'Seleção de países principais', dialogCopy:'Uma seleção de 16 países conhecidos para praticar, não uma classificação oficial. O interruptor oculta estas bandeiras em conjunto. Também pode ocultar qualquer bandeira com o botão × no respetivo cartão.', close:'Fechar', done:'Entendido', undo:'Desfazer', hide:'Ocultar {name}', hidden:'Ocultado: {name}', flag:'Bandeira de {name}', palette:'Cores principais da bandeira', source:'Imagens de bandeiras de', footer:'Os nomes seguem o idioma selecionado', method:'As cores são estimadas pela área da imagem. Diferenças até 2,5 pontos percentuais seguem a ordem vermelho, laranja, amarelo, verde, azul, roxo, preto e branco. Inclui 193 Estados-membros da ONU e 2 Estados observadores.', colors:['Vermelho','Laranja','Amarelo','Verde','Azul','Roxo','Preto','Branco'], description:'Guia de bandeiras para telemóveis com nomes traduzidos, ordenação por cor ou nome e opção de ocultar países.'
  },
  ja: {
    language:'言語', home:'Name the Flag ホーム', title:'国旗早見表', eyebrow:'ひと目でわかる世界', intro:'知っている国旗を隠して、知らない国旗を覚えよう。', total:'の国旗 · ひとつの世界', options:'表示オプション', sort:'並べ替え', color:'色順', alpha:'名前順', major:'主要国を非表示', list:'一覧を見る', jump:'グループへ移動', restore:'すべて再表示', shown:'{total} 件中 {count} 件の国旗を表示', colorOrder:'主な色で分類', alphaOrder:'日本語の国名順（文字の照合順）', names:'国名', empty:'すべての国旗が非表示です。「すべて再表示」でやり直せます。', dialogTitle:'主要国のプリセット', dialogCopy:'練習用に選んだ、よく知られる 16 か国です。公式な分類ではありません。スイッチでまとめて非表示にできます。各カードの × で個別に隠すこともできます。', close:'閉じる', done:'確認', undo:'元に戻す', hide:'{name}を非表示', hidden:'{name}を非表示にしました', flag:'{name}の国旗', palette:'国旗の主な色', source:'国旗画像の提供元：', footer:'国名は選択した言語で表示', method:'画像の面積から主な色を推定します。差が 2.5 ポイント以内の場合は、赤・オレンジ・黄・緑・青・紫・黒・白の順に分類します。国連加盟国 193 か国とオブザーバー国家 2 か国を収録。', colors:['赤','オレンジ','黄','緑','青','紫','黒','白'], description:'多言語の国名、色順・名前順、国旗の非表示機能に対応したスマートフォン向け国旗早見表。'
  },
  ko: {
    language:'언어', home:'Name the Flag 홈', title:'국기 한눈에 보기', eyebrow:'한눈에 보는 세계', intro:'익숙한 국기는 숨기고, 새로운 국기를 익혀 보세요.', total:'개 국기 · 하나의 세계', options:'표시 옵션', sort:'정렬 기준', color:'색상순', alpha:'이름순', major:'주요 국가 숨기기', list:'목록 보기', jump:'그룹으로 이동', restore:'모두 다시 표시', shown:'국기 {total}개 중 {count}개 표시', colorOrder:'주요 색상별 분류', alphaOrder:'한국어 국가명순', names:'국가명', empty:'모든 국기가 숨겨져 있습니다. “모두 다시 표시”를 선택해 다시 시작하세요.', dialogTitle:'주요 국가 목록', dialogCopy:'연습을 위해 선정한 익숙한 국가 16개이며 공식 분류가 아닙니다. 스위치로 함께 숨길 수 있습니다. 카드의 × 버튼으로 국기를 개별적으로 숨길 수도 있습니다.', close:'닫기', done:'확인', undo:'실행 취소', hide:'{name} 숨기기', hidden:'숨김: {name}', flag:'{name} 국기', palette:'국기의 주요 색상', source:'국기 이미지 출처:', footer:'선택한 언어로 국가명 표시', method:'이미지 면적으로 주요 색상을 추정합니다. 차이가 2.5%포인트 이내이면 빨강, 주황, 노랑, 초록, 파랑, 보라, 검정, 흰색 순서로 분류합니다. 유엔 회원국 193개와 옵서버 국가 2개를 수록했습니다.', colors:['빨강','주황','노랑','초록','파랑','보라','검정','흰색'], description:'번역된 국가명, 색상순·이름순 정렬, 국가 숨기기를 지원하는 모바일 국기 모음.'
  },
  ar: {
    language:'اللغة', home:'الصفحة الرئيسية لـ Name the Flag', title:'مرجع الأعلام', eyebrow:'العالم في لمحة', intro:'أخفِ ما تعرفه، وتعلّم ما لا تعرفه.', total:'علمًا · عالم واحد', options:'خيارات العرض', sort:'الترتيب حسب', color:'اللون', alpha:'اسم الدولة', major:'إخفاء الدول الرئيسية', list:'عرض القائمة', jump:'الانتقال إلى مجموعة', restore:'إظهار الكل', shown:'عرض {count} من أصل {total} علمًا', colorOrder:'حسب اللون الغالب', alphaOrder:'حسب أسماء الدول بالعربية', names:'أسماء الدول', empty:'كل الأعلام مخفية. اختر «إظهار الكل» للبدء من جديد.', dialogTitle:'قائمة الدول الرئيسية', dialogCopy:'مجموعة من 16 دولة معروفة للتدريب، وليست تصنيفًا رسميًا. يخفي المفتاح هذه الأعلام معًا. يمكنك أيضًا إخفاء أي علم باستخدام زر × في بطاقته.', close:'إغلاق', done:'حسنًا', undo:'تراجع', hide:'إخفاء {name}', hidden:'تم إخفاء: {name}', flag:'علم {name}', palette:'الألوان الرئيسية للعلم', source:'صور الأعلام من', footer:'تظهر أسماء الدول باللغة المختارة', method:'تُقدّر الألوان حسب مساحة الصورة. عند اختلاف النسب بما لا يتجاوز 2.5 نقطة مئوية، يُستخدم الترتيب: الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، البنفسجي، الأسود، الأبيض. يشمل 193 دولة عضوًا في الأمم المتحدة ودولتين بصفة مراقب.', colors:['أحمر','برتقالي','أصفر','أخضر','أزرق','بنفسجي','أسود','أبيض'], description:'مرجع أعلام مناسب للهاتف بأسماء دول مترجمة وترتيب حسب اللون أو الاسم وخيار إخفاء الدول.'
  }
};

// Layout and pattern-filter labels.
const VIEW_TRANSLATIONS = {
  "en": {
    "columns": "Columns",
    "columnCount": "{count} columns",
    "pattern": "Pattern",
    "allPatterns": "All patterns",
    "patternVertical": "Left / right",
    "patternHorizontal": "Up / down",
    "patternCenter": "Central symbol",
    "patternDiagonal": "Diagonal",
    "patternCross": "Cross",
    "patternHelp": "Select one or more. Flags matching any selected pattern are shown.",
    "filteredEmpty": "No matching flags. Select “Restore all” to clear filters and hidden flags.",
    "browse": "Browse"
  },
  "zh-CN": {
    "columns": "列数",
    "columnCount": "{count} 列",
    "pattern": "图案",
    "allPatterns": "全部图案",
    "patternVertical": "左右分色",
    "patternHorizontal": "上下分色",
    "patternCenter": "中央图案",
    "patternDiagonal": "斜线",
    "patternCross": "十字",
    "patternHelp": "可多选，显示符合任意所选图案的国旗。",
    "filteredEmpty": "没有匹配的国旗。点击“恢复全部”清除筛选并显示隐藏的国旗。",
    "browse": "浏览"
  },
  "zh-TW": {
    "columns": "欄數",
    "columnCount": "{count} 欄",
    "pattern": "圖案",
    "allPatterns": "全部圖案",
    "patternVertical": "左右分色",
    "patternHorizontal": "上下分色",
    "patternCenter": "中央圖案",
    "patternDiagonal": "斜線",
    "patternCross": "十字",
    "patternHelp": "可複選，顯示符合任一所選圖案的國旗。",
    "filteredEmpty": "沒有符合的國旗。點選「恢復全部」清除篩選並顯示隱藏的國旗。",
    "browse": "瀏覽"
  },
  "es": {
    "columns": "Columnas",
    "columnCount": "{count} columnas",
    "pattern": "Diseño",
    "allPatterns": "Todos los diseños",
    "patternVertical": "Izquierda / derecha",
    "patternHorizontal": "Arriba / abajo",
    "patternCenter": "Símbolo central",
    "patternDiagonal": "Diagonal",
    "patternCross": "Cruz",
    "patternHelp": "Selecciona uno o varios. Se muestran banderas que coincidan con cualquiera.",
    "filteredEmpty": "No hay coincidencias. Selecciona «Restaurar todo» para quitar filtros y mostrar las banderas ocultas.",
    "browse": "Explorar"
  },
  "fr": {
    "columns": "Colonnes",
    "columnCount": "{count} colonnes",
    "pattern": "Motif",
    "allPatterns": "Tous les motifs",
    "patternVertical": "Gauche / droite",
    "patternHorizontal": "Haut / bas",
    "patternCenter": "Symbole central",
    "patternDiagonal": "Diagonale",
    "patternCross": "Croix",
    "patternHelp": "Sélectionnez un ou plusieurs motifs. Les drapeaux correspondant à au moins un motif sont affichés.",
    "filteredEmpty": "Aucun résultat. « Tout réafficher » efface les filtres et révèle les drapeaux masqués.",
    "browse": "Parcourir"
  },
  "de": {
    "columns": "Spalten",
    "columnCount": "{count} Spalten",
    "pattern": "Muster",
    "allPatterns": "Alle Muster",
    "patternVertical": "Links / rechts",
    "patternHorizontal": "Oben / unten",
    "patternCenter": "Zentrales Symbol",
    "patternDiagonal": "Diagonal",
    "patternCross": "Kreuz",
    "patternHelp": "Ein oder mehrere Muster wählen. Flaggen mit mindestens einem gewählten Muster werden angezeigt.",
    "filteredEmpty": "Keine Treffer. „Alle anzeigen“ entfernt Filter und zeigt ausgeblendete Flaggen.",
    "browse": "Durchsuchen"
  },
  "pt": {
    "columns": "Colunas",
    "columnCount": "{count} colunas",
    "pattern": "Padrão",
    "allPatterns": "Todos os padrões",
    "patternVertical": "Esquerda / direita",
    "patternHorizontal": "Cima / baixo",
    "patternCenter": "Símbolo central",
    "patternDiagonal": "Diagonal",
    "patternCross": "Cruz",
    "patternHelp": "Selecione um ou mais padrões. São mostradas bandeiras com qualquer padrão selecionado.",
    "filteredEmpty": "Sem resultados. Selecione «Mostrar todas» para limpar os filtros e mostrar as bandeiras ocultas.",
    "browse": "Explorar"
  },
  "ja": {
    "columns": "列数",
    "columnCount": "{count} 列",
    "pattern": "模様",
    "allPatterns": "すべての模様",
    "patternVertical": "左右の配色",
    "patternHorizontal": "上下の配色",
    "patternCenter": "中央のシンボル",
    "patternDiagonal": "斜め",
    "patternCross": "十字",
    "patternHelp": "複数選択できます。選択した模様のいずれかに一致する国旗を表示します。",
    "filteredEmpty": "一致する国旗がありません。「すべて再表示」で絞り込みと非表示を解除します。",
    "browse": "表示設定"
  },
  "ko": {
    "columns": "열 수",
    "columnCount": "{count}열",
    "pattern": "무늬",
    "allPatterns": "모든 무늬",
    "patternVertical": "좌우 배색",
    "patternHorizontal": "상하 배색",
    "patternCenter": "중앙 상징",
    "patternDiagonal": "대각선",
    "patternCross": "십자",
    "patternHelp": "여러 개를 선택할 수 있습니다. 선택한 무늬 중 하나라도 일치하는 국기를 표시합니다.",
    "filteredEmpty": "일치하는 국기가 없습니다. “모두 다시 표시”로 필터와 숨김을 해제하세요.",
    "browse": "둘러보기"
  },
  "ar": {
    "columns": "الأعمدة",
    "columnCount": "{count} أعمدة",
    "pattern": "النمط",
    "allPatterns": "كل الأنماط",
    "patternVertical": "يمين / يسار",
    "patternHorizontal": "أعلى / أسفل",
    "patternCenter": "رمز مركزي",
    "patternDiagonal": "قطري",
    "patternCross": "صليب",
    "patternHelp": "اختر نمطًا أو أكثر. تظهر الأعلام المطابقة لأي نمط محدد.",
    "filteredEmpty": "لا توجد أعلام مطابقة. اختر «إظهار الكل» لإزالة المرشحات وإظهار الأعلام المخفية.",
    "browse": "تصفح"
  }
};
for (const [locale, strings] of Object.entries(VIEW_TRANSLATIONS)) Object.assign(TRANSLATIONS[locale], strings);
