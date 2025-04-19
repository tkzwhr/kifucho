import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "kifucho",
  password: "postgres",
  port: 20001,
});

try {
  await client.connect();
  await client.query(
    "INSERT INTO users (id, name) VALUES ('dev_user', 'Dev User') ON CONFLICT DO NOTHING;",
  );
  await client.query(
    "INSERT INTO records (owned_by, sgf_text) VALUES" +
      "('dev_user', '(;GM[1]FF[4]CA[UTF-8]SZ[9]DT[2021-02-03]PB[<@dev_user>]BR[7k]PW[Alice]WR[5k]KM[0.5]HA[2]AB[cg][gc]GN[Game1]RE[B+11.5];W[cc];B[gg];W[ee];B[ff];W[ef];B[eg];W[bf];B[bg];W[cf];B[df];W[de];B[fe];W[fd];B[gd];W[fc];B[fb];W[ec];B[eb];W[db];B[da];W[ca];B[af];W[be];B[ae];W[ad];B[ag];W[bd];B[gb];W[ea];B[fa];W[da];B[];W[])')," +
      "('dev_user', '(;GM[1]FF[4]CA[UTF-8]SZ[9]DT[2021-04-05]PB[Bob]BR[5k]PW[<@dev_user>]WR[7k]KM[6.5]GN[Game2]RE[W+R];B[gc];W[cg];B[cd];W[ge];B[ee];W[fd];B[eb];W[fg];B[dg];W[df];B[ef];W[eg];B[dh];W[cf];B[gf];W[ff];B[fe];W[gg];B[gd];W[he];B[hf];W[hg];B[hd];W[if];B[be];W[bf];B[af];W[ag];B[ae];W[bh];B[de];W[ce];B[bd];W[dd])')," +
      "('dev_user', '(;GM[1]FF[4]CA[UTF-8]SZ[9]DT[2021-06-07]PB[<@dev_user>]PW[Charlie];B[gc];W[cg])');",
  );
  console.info("Created a user and records.");
} catch (err) {
  console.error("Error executing query: ", err);
} finally {
  client.end();
}
