module.exports = Object.freeze({
    githubCleanArrays : [
        ['ref', 'before', 'after', 'pusher', 'sender', 'created', 'deleted', 'forced', 'base_ref', 'compare', 'commits'], 
        ['node_id', 'full_name', 'private', 'owner', 'html_url', 'description', 'fork', 'url', 'forks_url', 'keys_url',
        'collaborators_url', 'teams_url', 'hooks_url', 'issue_events_url',
        'events_url', 'assignees_url', 'branches_url', 'tags_url', 'blobs_url', 
        'git_tags_url', 'git_refs_url', 'trees_url', 'statuses_url', 'languages_url', 'stargazers_url',
        'contributors_url', 'subscribers_url', 'subscription_url', 'commits_url',
        'git_commits_url', 'comments_url', 'issue_comment_url', 'contents_url',
        'compare_url', 'merges_url', 'archive_url', 'downloads_url', 'issues_url', 'pulls_url',
        'milestones_url', 'notifications_url', 'labels_url', 'releases_url',
        'deployments_url', 'created_at', 'updated_at', 'pushed_at', 'git_url',
        'ssh_url', 'clone_url', 'svn_url', 'homepage', 'size', 'stargazers_count',
        'watchers_count', 'language', 'has_issues', 'has_projects', 'has_downloads', 'has_wiki', 
        'has_pages', 'forks_count', 'mirror_url', 'archived', 'disabled', 'open_issues_count', 'license', 
        'forks', 'open_issues', 'watchers', 'default_branch', 'stargazers', 'master_branch'],
        ['tree_id', 'distinct', 'url', 'committer']
    ],
    githubCleanStrings : [[], ['repository'], ['head_commit']],
    //PUSH
        //forced, old, links, created, truncated, closed,
            //rendered, links, author, summary, parents, type, properties, 
            //name, links, default_merge_strategy, merge_strategies, type, 
                //rendered, hash, links, parents, date, message, type, properties, 
                    //raw, type, display_name, uuid, links, type, account_id, 
                    //markup, html, type, 
    
    bitbucketCleanArrays : [
        ['forced', 'old', 'links', 'created', 'truncated', 'closed'], 
        ['rendered', 'links', 'author', 'summary', 'parents', 'type', 'properties'],
        ['name', 'links', 'default_merge_strategy', 'merge_strategies', 'type'],
        ['rendered', 'hash', 'links', 'parents', 'date', 'message', 'type', 'properties'],
        ['raw', 'type', 'display_name', 'uuid', 'links', 'type', 'account_id'],
        ['markup', 'html', 'type']
        ['actor'], 
        ['scm', 'website', 'links', 'project', 'owner', 'type', 'is_private']
    ],
    bitbucketCleanStrings : [
        ['push', 'changes'], 
        ['push', 'changes', 'commits'], 
        ['push', 'changes', 'new'],
        ['push', 'changes', 'new', 'target'],
        ['push', 'changes', 'new', 'target', 'author'],
        ['push', 'changes', 'new', 'target', 'summary'],
        [], 
        ['repository']
    ],

    gitlabCleanArrays : [
        ['object_kind', 'event_name', 'before',
	    'after', 'ref', 'checkout_sha', 'message', 'user_id',
	    'user_name', 'user_username', 'user_email', 'user_avatar', 'project_id', 'total_commits_count',
        'push_options'], 
        ['name', 'description', 'web_url',
		'avatar_url', 'git_ssh_url', 'git_http_url',
		'namespace', 'visibility_level', 'path_with_namespace',
        'default_branch', 'ci_config_path','homepage', 'url', 'ssh_url', 'http_url'],
        ['title', 'url'],
        ['description', 'homepage', 'git_http_url',	'git_ssh_url', 'visibility_level']
        
    ],
    gitlabCleanStrings : [[], ['project'], ['commits'], ['repository']],
});