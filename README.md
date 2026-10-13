# O・TE Dance School リニューアル試作

福島市のO・TE Dance Schoolを紹介する、6ページの静的サイトです。トップはオリジナルのダンスイラスト、紹介欄は旧公式サイトの実写真を使っています。お問い合わせ・体験・見学は公式LINEへ接続します。

## パソコンで確認する

Node.js 22以上で、次を実行します。追加ライブラリのインストールは不要です。

```sh
npm run build
npm run check
npm run dev
```

ブラウザで `http://127.0.0.1:4173/` を開きます。終了は `Ctrl+C`。ソースを編集したら `npm run build` を実行し、ブラウザを更新してください。

## 更新する場所

| 内容 | ファイル |
| --- | --- |
| 公式LINE・Instagram・住所・料金 | `src/site.json` |
| 月間予定・振替のお知らせ | `src/monthly-schedule.json` |
| 月間表の画像 | `dist/assets/monthly-schedule.png` |
| 文面・ページの構成 | `scripts/build.mjs` |
| デザイン | `src/styles.css` |
| メニュー・写真の拡大 | `src/app.js` |

`dist/` が公開用ファイルです。ビルドは画像を消しません。写真を差し替える場合は、同じ名前の画像を `dist/assets/` に置き、ビルドしてください。

Codexへの依頼例：

> 添付の12月スケジュールに合わせて、月間表の画像と日付別の一覧を更新してください。元の表と照合し、振替の案内も更新して、ローカルプレビューを開いてください。

## スケジュールの運用

現在は、提供画像を表示し、同じ内容をJSONから日付別に読みやすく表示しています。未記載の時刻は補完していません。画像に年の記載がないため、`year` は `null` です。スケジュールページには月間予定のみを掲載し、旧サイトの通常クラス表は表示していません。

まずは現在の表をそのまま作り続け、毎月画像と一覧をCodexで更新する方法が簡単です。ExcelやGoogleスプレッドシートが元データなら、あとでCSVから一覧を作成する仕組みに拡張できます。Googleカレンダーの埋め込みも可能ですが、元の表とは別の予定入力が必要になりやすいため、この初版には追加していません。

## お知らせとLINE

トップには月間予定に関係する振替・祝日の案内を表示します。衣装・DVD・保護者への個別連絡などは、公式LINEで確認する導線です。最新の提供案内に合わせ、休会・退会は前月20日までの指定用紙申請としてあります。

## GitHub ActionsとCloudflare Pages

`.github/workflows/site.yml` は、mainへのpush・main向けのPRでビルドとファイル検査を行い、確認用のHTML一式をActionsのArtifactに保存します。

CloudflareでDirect UploadのPagesプロジェクトを用意し、production branchを `main` に設定したうえで、GitHubリポジトリのSettings → Secrets and variables → Actionsに次を設定します。

| 種類 | 名前 | 内容 |
| --- | --- | --- |
| Variable | `CLOUDFLARE_PAGES_PROJECT` | Pagesのプロジェクト名 |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | CloudflareのアカウントID |
| Secret | `CLOUDFLARE_API_TOKEN` | 対象アカウントのPages編集権限を持つAPIトークン |

設定がない間は検査だけ実行し、公開処理はスキップします。同じリポジトリ内のPRは `pr-番号` のプレビューへ、mainは本番へ公開します。forkからのPRは公開用Secretを使いません。

参考：https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/

## 一般公開前に確認する内容

- 現在の料金・通常クラス・所在地。
- 11月スケジュールの年と、画像から整理した日付別一覧。
- 入会時の支払いと、クラス変更・休会・退会の条件。
- 写真の継続掲載とプライバシーポリシー案。
- 全HTMLの `noindex,nofollow` と `robots.txt` の公開用設定。現在は試作のため検索登録を止めています。

GitHubに置くソースとPagesで公開するサイトは別です。画像や元データは、公開リポジトリでは誰でも取得できます。LINEの通知画像そのものは、このソースには含めていません。

## デザインの参考と画像

最近の事例紹介と、実サイトの文字・写真の見せ方を調べました。コピー・配色・構成・画像はO・TE向けに制作しています。他サイトのコード・ロゴ・画像は使用していません。

- [Family Style / Awwwards 2025 Honorable Mention](https://www.awwwards.com/sites/family-style)
- [Family Style](https://wearefamilystyle.com/)
- [ZEAL STUDIOS](https://zeal-studios.com/)
- [ダンススクールのデザイン事例 / ワクタス 2025](https://wakutas.co.jp/blog/7427)

画像の出典と生成プロンプトは `ASSETS.md` を参照してください。
